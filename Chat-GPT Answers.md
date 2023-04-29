### QUESTION

Inside my HTML code, I usually use `<script src="./mindar-image-three.prod.js"></script>` `<script src="./main.js" type="module"></script>` inside the `<body>` tag. However, some tutorials show me I'm supposed to use those two code lines inside the `<head>` tag instead. Why is that?



### ANSWER

###### The `<script>` tag can be written inside both the `<head>` and `<body>` sections of an HTML document¹. However, there are some differences and trade-offs between the two options.

###### If you place the `<script>` tag inside the `<head>` section, it means that the browser will load and execute the script before rendering the page content. This can be useful if you need to define some functions or variables that are used later in the page, or if you want to run some code as soon as possible². 

However, this can also cause a **performance or page load issue**, because the script may block the rendering of the page until it is downloaded and executed. This can result in a **blank or unresponsive page** for some time, which can affect the user experience²³.

###### If you place the `<script>` tag inside the `<body>` section, it means that the browser will load and execute the script after rendering the page content. This can be useful if you want to avoid blocking the page rendering, or if your script depends on some elements that are defined in the body². 

However, this can also cause some problems if your script needs to run before some events or actions that may occur in the page, such as user interactions or DOM manipulations². This can result in a **delayed or incorrect functionality** of your script, which can also affect the user experience²³.

###### A common practice is to place **library scripts** such as jQuery or other frameworks in the `<head>` section, and place **normal scripts** that use those libraries or write page content in the `<body>` section, preferably at the end of it²⁴. This way, you can ensure that your libraries are loaded before your scripts, and that your scripts do not interfere with the page rendering²⁴. However, this is not a strict rule, and you may need to adjust your placement depending on your specific needs and goals.

###### Another option is to use the `async` or `defer` attributes on your `<script>` tags, which allow you to control when and how your scripts are loaded and executed by the browser. The `async` attribute tells the browser to load and execute the script asynchronously, without blocking the page rendering. The `defer` attribute tells the browser to load the script asynchronously, but execute it after the page has finished parsing. Both attributes can improve the performance and user experience of your page, but they also have some limitations and caveats that you should be aware of. You can read more about them here: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script#attr-async

###### Origem: conversa com o Bing, 29/04/2023
###### (1) JavaScript - JavaScript in Head and Body Tag - TutsMaster. https://tutsmaster.org/javascript-javascript-in-head-and-body-tag/.
###### (2) Should I write script in the body or the head of the html?. https://stackoverflow.com/questions/3531314/should-i-write-script-in-the-body-or-the-head-of-the-html.
###### (3) When to use the <script> tag in the head and body section of a html .... https://stackoverflow.com/questions/38407962/when-to-use-the-script-tag-in-the-head-and-body-section-of-a-html-page.
###### (4) Script Tags: Do They Belong in the Body or the Head Section?. https://www.locofy.ai/blog/script-tags.
###### (5) Where to put a script tag — into head or body end? - Medium. https://medium.com/geekculture/where-to-put-a-script-tag-into-head-or-body-end-b5b063058e0b.
