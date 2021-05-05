
const Sitemap = () => {};
const toUrl = (route) =>
  `<url><loc>https://wikistacks.com/blogs/${route.slug}</loc><lastmod>${route.updatedAt}</lastmod><priority>1.0</priority></url>`;
  
const createSitemap = (urlList) => 
  `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urlList.map((url) => toUrl(url)).join("")}
    </urlset>`;
	
export async function getServerSideProps({ res, req }) {      
	// const siteMapJson = await fetch(`https://wikistacks/api/sitemaps`);
	const siteMapJson = await fetch(`http://localhost:8000/api/sitemaps`);
	const urlList = await siteMapJson.json();
	const sitemap = createSitemap(urlList);
	res.setHeader("Content-Type", "text/xml");
	res.write(sitemap);
	res.end();
	return { props: { results : {urlList}}}
};
export default Sitemap;