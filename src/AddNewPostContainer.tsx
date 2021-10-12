export const AddNewPostContainer = () => {
    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const payload = {
            title: e.target.elements.title.value,
            body: e.target.elements.body.value
        };

        try {
           await fetch('/posts', {
                method: 'POST',
                body: JSON.stringify(payload)
            })
    
    
            e.target.reset();
        } catch {
            console.error('something went wrong when adding a new post')
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="title" placeholder="Title" />
            <input type="text" name="body" placeholder="Body" />
            <button type="submit">Add new post</button>
        </form>
    );
};
