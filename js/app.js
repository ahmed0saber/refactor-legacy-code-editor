const htmlTextarea = document.getElementById("htmlCode");
const cssTextarea = document.getElementById("cssCode");
const jsTextarea = document.getElementById("jsCode");

const validateJsCode = (code) => {
    try {
        eval(code);
    }
    catch (error) {
        return {
            success: false,
            error,
        };
    }

    return {
        success: true,
    };
};

const showIframePreview = () => {
    const frame = document.getElementById("preview-window").contentWindow.document;
    const jsValidation = validateJsCode(jsTextarea.value);
    if (!jsValidation.success) {
        alert("Error in JavaScript code." + jsValidation.error);
    }

    frame.open();
    frame.write(`
        ${htmlTextarea.value}
        <style>${cssTextarea.value}</style>
        <script>${jsTextarea.value}</script>
    `);
    frame.close();
}

const setDataToLocalStorage = () => {
    localStorage.setItem("data", JSON.stringify({
        html: htmlTextarea.value,
        css: cssTextarea.value,
        js: jsTextarea.value,
    }));
}

const getDataFromLocalStorage = () => {
    if (localStorage.getItem("data")) {
        return JSON.parse(localStorage.getItem("data"));
    }

    return {
        html: "",
        css: "",
        js: "",
    };
}

const displayDataInTextareas = (data) => {
    htmlTextarea.value = data.html;
    cssTextarea.value = data.css;
    jsTextarea.value = data.js;
}

const initTextareaEventListener = () => {
    const allTextareas = document.querySelectorAll("textarea");
    allTextareas.forEach(textarea => {
        textarea.addEventListener("change", () => {
            showIframePreview();
            setDataToLocalStorage();
        });
    });
}

const initNavBtnsEventListener = () => {
    const navBtns = document.querySelectorAll(".nav-btn-wrapper");
    navBtns.forEach(navBtn => {
        navBtn.addEventListener("click", () => {
            showTabById(navBtn.dataset.id);
        });
    });
}

const showTabById = (tabId) => {
    const tabs = document.querySelectorAll(".tabs");
    const currentTab = document.getElementById(tabId);
    tabs.forEach(tab => tab.classList.add("mobile-d-none"));
    currentTab.classList.remove("mobile-d-none");
}

const init = () => {
    const data = getDataFromLocalStorage();
    displayDataInTextareas(data);
    showIframePreview();
    initTextareaEventListener();
    initNavBtnsEventListener();
}
init();
