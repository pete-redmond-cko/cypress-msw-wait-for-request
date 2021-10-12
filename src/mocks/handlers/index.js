import { rest } from "msw";
import { posts } from "./data";

export const handlers = [
    rest.get("/posts", (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                posts,
            })
        );
    }),
    rest.post("/posts", (req, res, ctx) => {
        return res(
            ctx.status(200),
        );
    }),
];
