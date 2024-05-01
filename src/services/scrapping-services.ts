import { chromium } from "playwright";
interface Product {
    title: string;
    price: string;
}
class ScrappingServices {

    /**
     * Asynchronously runs the web scrapping process.
     *
     * @return {Promise<Product[]>} An array of Product objects.
     */
    async runScrapping(): Promise<Product[]> {
        // Launches a headless chromium browser
        const browser = await chromium.launch({ headless: true });

        // Creates a new page in the browser
        const page = await browser.newPage();

        // Navigates to the specified URL
        await page.goto(
            'https://www.amazon.com/s?k=gaming+keyboard&language=es&_encoding=UTF8&content-id=amzn1.sym.8148f1e1-83ed-498f-85be-ff288b197da7&pd_rd_r=c0ec38a9-a879-4afb-bead-2505ef376119&pd_rd_w=M9ZyP&pd_rd_wg=s1BXP&pf_rd_p=8148f1e1-83ed-498f-85be-ff288b197da7&pf_rd_r=C4FAAJ5EXWE0SN375509&ref=pd_gw_unk'
        );

        // Selects all elements with the class '.puisg-col-inner'
        // and maps each element to a Product object
        const productItems = await page.$$eval('.puisg-col-inner', (items) => {
            return items.map((item) => {
                // Retrieves the title of the product
                const title = item.querySelector('h2')?.innerText;

                // Retrieves the price of the product
                const price = (item.querySelector('span.a-price-whole') as HTMLElement)?.innerText.replace('\n.', '$');

                // Returns a Product object with the title and price,
                // or null if either title or price is undefined
                return title && price ? { title, price } : null;
            });
        });

        // Closes the browser
        browser.close();

        // Filters out any null values from the array
        // and returns the result as an array of Product objects
        return productItems.filter((item) => item !== null) as Product[];
    }


}

export { ScrappingServices };