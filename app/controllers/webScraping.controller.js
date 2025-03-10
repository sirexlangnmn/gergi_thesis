const axios = require('axios');

module.exports = {

    openResearchLibrary: async (req, res) => {
        const searchKeyword = req.body.searchKeyword;
        const encoded = encodeURIComponent(searchKeyword);
        console.log('encoded ==> ', encoded)

        const url = `https://api.biblioboard.com/search/v2?facet-list=true&limit=20&org-id=1f7368e7-f10b-49a1-8ced-2d9476279974&platform=WEB&offset=0&g=${encoded}`
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Accept": "application/json, text/javascript, */*; q=0.01",
                    "Accept-Language": "en-US,en;q=0.6",
                    "Connection": "keep-alive",
                    "Origin": "https://openresearchlibrary.org",
                    "Referer": "https://openresearchlibrary.org/",
                    "Sec-Fetch-Dest": "empty",
                    "Sec-Fetch-Mode": "cors",
                    "Sec-Fetch-Site": "cross-site",
                    "Sec-GPC": "1",
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36",
                    "X-Auth-Token": "47554950-4483-4bca-92ef-a9228a4b5914",
                    "X-Biblio-Audience": "library.biblioboard.com",
                    "sec-ch-ua": "\"Chromium\";v=\"134\", \"Not:A-Brand\";v=\"24\", \"Brave\";v=\"134\"",
                    "sec-ch-ua-mobile": "?0",
                    "sec-ch-ua-platform": "\"Windows\""
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            res.json(data);
            // console.log('one data ', data);
        } catch (error) {
            console.error("Error:", error);
        }
    },


    fetchPdfRoomApiData: async (req, res) => {
        const searchKeyword = req.body.searchKeyword;
        const encoded = encodeURIComponent(searchKeyword);

        const url = `https://pdfroom.com/search?query=${encoded}`;

        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
                    "accept-language": "en-US,en;q=0.5",
                    "cache-control": "no-cache",
                    "pragma": "no-cache",
                    "priority": "u=0, i",
                    "sec-ch-ua": "\"Chromium\";v=\"134\", \"Not:A-Brand\";v=\"24\", \"Brave\";v=\"134\"",
                    "sec-ch-ua-mobile": "?0",
                    "sec-ch-ua-platform": "\"Windows\"",
                    "sec-fetch-dest": "document",
                    "sec-fetch-mode": "navigate",
                    "sec-fetch-site": "same-origin",
                    "sec-fetch-user": "?1",
                    "sec-gpc": "1",
                    "upgrade-insecure-requests": "1",
                    "cookie": "cf_clearance=niIojHg6yQKzC9jpNqv6yX40BViSYEFX.JZ1O30T.rk-1741619182-1.2.1.1-VA6TGMCYcjYkMKkyE4J8sWWeKz8QylVmmY2Lwp6pXKUrhX5NQ67q1mBhRiBIWz.__aMhWCJepKpMfGJybWwpLjOhFc0_0716cy3Xxs60PrWaaOoY69zxUf3XZSP9f0fCJrFPDEXo1ysZvw3QWr118P5gPEzW.r.z04jb8.4RjtODGFGHQDzvV6JC8qFkIl0aGFNDyTLTPGTTxEHYWnICxd34aatnkFjEKJpli_NBl6WQkkWaN42.vCouJBdjm6p.Bb5AZcnPjvSI5G2GmDbQl4ulDDCCFWxzxPzGtR6TedsJi6GrnPr1HPdvpF5.OOjwunXjeQecDBQbvdT7RYfE4MIyowsrIS21UWKz2yjvx.cGreYAdn6GoBE9TvoWgQMPooCny1RCyLXiqYSc6iYB6JsPbxcjiftugqXLKumnfVY; XSRF-TOKEN=eyJpdiI6IjA1QklGZkUrSWw1SjZ6UHg4UFRwSWc9PSIsInZhbHVlIjoiOEVBbC93UEJxNGdVZkNGWStaZ2sramdIeEhnckRJWmNkdE1valpQbE1CTGRlMURxWDd5NzlIcFRNMXVKby81K0tjZ2NOdlBZaVNycnVWWXRuSU5NQzVyZVJvVzhjSG1wN1lQQk1mdzVUd2VRcEZMSDAxSk9ub0l6VWhGYm1idlEiLCJtYWMiOiIxOTRhYjkwMTM4OTQ2YWJlNTIyNjQ0NTJiNzc0NzBjNWM3ODlmZGNiMDBiMGIwNDM0YTJiZTQwNTkzNzE0YjM4IiwidGFnIjoiIn0%3D; pdf_room_session=eyJpdiI6IlhhcVlBTVNMbUlOa3BsOTAwbEhaSVE9PSIsInZhbHVlIjoiWDRZZXV1eU9jKzdOclhsTmlPSXRHTjhUdWRoR3p4aGVLcjEzUVM0M285K2VOMVJvcWlCQnprc1pnRFR6Tm13RER3cU1vQTV4R3IwcTRkUm45QnhlenlaRWhsOWQ2WnZ2WTNtUm5sUkorUWVIVys4STd5MWVtWStzcW9yaTZXaDgiLCJtYWMiOiIxMTI5NmM4ZGExMDY5MTAyYzhiZDNmMzE4ZjFiMWNlZTFjNzFlMWJjOGJhM2E3NzJmYzk1Nzc4MmQ2Y2RiMWFiIiwidGFnIjoiIn0%3D; locale=eyJpdiI6Ik8ycGlmbERjWmplb3ZnbURqQktwa1E9PSIsInZhbHVlIjoiVnY3YjVtQUVtdTB2N1pYaldmYzhxT2tEbjlHbDJwOXdHZTlFRzNGaW03d2xyZ3RKbk9GcmVMK2Y2ZlRCN1VIViIsIm1hYyI6IjlkNDc5MjdkNzk0MTUzMzBlMzUzMzdiNmU1OTczMWFkOWUyM2Y3MDQ2YTE5NzRjMjMxZmQzOWEwMTdlMmVmZjMiLCJ0YWciOiIifQ%3D%3D",
                    "Referer": "https://pdfroom.com/",
                    "Referrer-Policy": "strict-origin-when-cross-origin"
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.text();
            // console.log('backend fetchApiData data ', data);
            res.send(data);
        } catch (error) {
            console.error("Error:", error);
        }



    },






    // three: async (req, res) => {
    //     try {
    //         // code here
    //     } catch (error) {
    //         console.error("Error in 'three':", error);
    //         res.status(500).json({ error: "Internal Server Error" });
    //     }
    // },

    // four: async (req, res) => {
    //     try {
    //         // code here
    //     } catch (error) {
    //         console.error("Error in 'four':", error);
    //         res.status(500).json({ error: "Internal Server Error" });
    //     }
    // },
};