const createCourseSlug = (courseName, wordLimit = 5) => {
    // Convert course name to lowercase
    let slug = courseName.toLowerCase();

    // Split the course name into words before the ':'
    let words = slug.split(/:/)[0].split(/\s+/);

    // Filter out insignificant words
    const insignificantWords = new Set(["how", "and", "the", "of", "to", "a", "in", "for", "on", "with", "at"]);
    words = words.filter(word => !insignificantWords.has(word));

    // Select the most relevant words up to the word limit
    words = words.slice(0, wordLimit);

    // Join the words and slug them
    slug = words.join(' ');

    // Replace spaces with dashes
    slug = slug.replace(/\s+/g, '-');

    // Remove special characters
    slug = slug.replace(/[^\w-]/g, '');

    return slug;
}

export default createCourseSlug;