/* eslint-disable jest/valid-expect-in-promise */
import { matchRequestUrl } from "msw";

const waitForRequest = ({ worker, url, method }) => {
    let requestId = "";

    return new Promise((resolve, reject) => {
        worker.events.on("request:start", (req) => {
            const matchesMethod =
                req.method.toLowerCase() === method.toLowerCase();
            const matchesUrl = matchRequestUrl(req.url, url);
            if (matchesMethod && matchesUrl) {
                requestId = req.id;
            }
        });

        worker.events.on("request:match", (req) => {
            if (req.id === requestId) {
                resolve(req);
            }
        });

        worker.events.on("request:unhandled", (req) => {
            if (req.id === requestId) {
                reject(
                    new Error(
                        `The ${req.method} ${req.url.href} request was unhandled.`
                    )
                );
            }
        });
    });
};



describe("Posts", () => {
    it("should load a list of posts", () => {
        cy.visit("http://localhost:3000/");
        cy.contains("Getting started with react").should("exist");
        cy.contains("Using MSW with cypress").should("exist");
    });

    it("should handle adding a new post", () => {
        cy.visit("http://localhost:3000/");
        cy.window().then((window) => {
            const { worker, onStart } = window.msw;
            const pendingRequest = waitForRequest({ worker, url: '/posts', method: 'POST' });

            cy.get('input[name="title"]').type("new title");
            cy.get('input[name="body"]').type("new body");
            cy.get('button[type="submit"]').click();


            cy.wrap(pendingRequest).then((request) => {
                let body = JSON.parse(request.body);
                expect(body.title).equal("new title");
                expect(body.body).equal("new body");
            });
        });
    });
});

// dashboard check payload
