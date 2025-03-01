const QUERY = {
    getResources: `
        SELECT
            r.*,
            rs.*,
            c.title as category_title,
            s.id, s.subject_title_id,
            st.title as subject_title
        FROM
            resources r
        LEFT JOIN
            resource_setups rs ON r.resource_id = rs.resource_id
        LEFT JOIN
            categories c ON rs.category_id = c.id
        LEFT JOIN
            subjects s ON rs.subject_id = s.id
        LEFT JOIN
            subject_titles st ON s.subject_title_id = st.id
    `,

}

// export default QUERY;
module.exports = QUERY;