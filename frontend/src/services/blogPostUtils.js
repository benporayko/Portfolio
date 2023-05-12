import BlogDataService from "./blogService.js";

export async function retrievePosts() {
        let response = await BlogDataService.getAll();
            // sorts array by date, with newest blog post being at index 0
            // reverse by swapping dateB and dateA in the return statement
            let sortedArray = response.data.blog_posts.sort(
                function compare(a, b) {
                    let dateA = new Date(a.date);
                    let dateB = new Date(b.date);
                    return dateB - dateA;
                }
            )
            // ensures that only posts marked as published appear on the blog page
            let filterByPublished = sortedArray.filter(function(x) {return x.published === true });
            
            return filterByPublished;
    }