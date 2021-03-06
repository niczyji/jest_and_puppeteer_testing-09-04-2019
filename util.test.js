const puppeteer = require("puppeteer");
const { generateText, checkAndGenerate } = require("./util");

test("should output name and age", () => {
  const text = generateText("Max", 29);
  expect(text).toBe("Max (29 years old)");
});

test("should generate a valid text output", () => {
  const text = checkAndGenerate("Max", 29);
  expect(text).toBe("Max (29 years old)");
});

test("should create an element with text and correct class", async () => {
  const browser = await puppeteer.launch({
    headless: false, //or false
    slowMo: 80,
    devtools: true
    //args: ["--window-size=1920,1080"]
  });
  const page = await browser.newPage();
  await page.goto(
    // link from index.html
    "file:///home/mika/Downloads/jest_and_puppeteer_testing-09-04-2019/index.html"
  );
  await page.click("input#name");
  await page.type("input#name", "Anna");
  await page.click("input#age");
  await page.type("input#age", "28");
  await page.click("#btnAddUser");
  await page.click("input#name");
  await page.type("input#name", "Sam");
  await page.click("input#age");
  await page.type("input#age", "30");
  await page.click("#btnAddUser");
  const finalText = await page.$eval(".user-item", el => el.textContent);
  expect(finalText).toBe("Anna (28 years old)");
}, 100000);
