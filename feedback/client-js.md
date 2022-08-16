**Things done well**

-   Each function is short, readable, and understandable
-   Good use of api for news. Consumed in UI properly 👍
-   Good status handling in log in function.

**Things to improve**

-   In `getNewsData` function, better to validate `val` before passing it into API.
-   In `addNewsToPAge` function, could've used `append` instead of `appendChild`. That would let you do something like this:
    ```js
    div.append(image, p, aTag, datep);
    ```
    instead of:
    ```js
    div.appendChild(image);
    div.appendChild(p);
    div.appendChild(aTag);
    div.appendChild(datep);
    ```
