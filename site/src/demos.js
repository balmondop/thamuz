const path = require("path");
const fs = require("fs");
const www = require("./www");
const gstyle = require("./gstyle");
const t = www.tag;

const css = {
	...gstyle,
	"body": {
		"display": "flex",
		"flex-direction": "column",
		"body": "100%",
		"height": "100%",
	},
	"button": {
		"padding": "0 8px",
		"border": "none",
		"background": "#ffffff",
		"border-radius": "4px",
		"font-size": "20px",
		"cursor": "pointer",
		"font-family": "IBM Plex Mono",
		":active": {
			"background": "black",
			"color": "white",
		},
	},
	"select": {
		"font-family": "IBM Plex Mono",
		"font-size": "20px",
		"border-radius": "4px",
		"border": "none",
		"background": "#ffffff",
		"padding": "0 8px",
		":focus": {
			"outline": "none",
		},
	},
	"#header": {
		"width": "100%",
		"height": "48px",
		"background": "red",
		"overflow": "hidden",
		"display": "flex",
		"align-items": "center",
		"padding": "0 16px",
		"justify-content": "space-between",
		"background": "#1e202b",
		"> div": {
			...www.hspace(16),
			"display": "flex",
			"align-items": "center",
			"height": "100%",
		},
		"#logo": {
			"height": "120px",
		},
	},
	"#content": {
		"width": "100%",
		"height": "calc(100% - 48px)",
		"display": "flex",
	},
	"#editor": {
		"width": "50%",
		"height": "100%",
		"overflow": "scroll",
		"font-family": "IBM Plex Mono",
		"font-size": "24px",
		"padding": "12px",
	},
	"#view": {
		"width": "50%",
		"height": "100%",
		"background": "black",
		"border": "none",
	},
};

const demos = {};

fs.readdirSync("../demos").forEach((file) => {
	if (file.startsWith(".")) {
		return;
	}
	const p = path.resolve("../demos", file);
	const name = path.basename(file, path.extname(file));
	const stat = fs.statSync(p);
	if (!stat.isFile()) {
		return;
	}
	demos[name] = fs.readFileSync(p, "utf-8");
}, {});

const DEF_DEMO = "runner";

const page = t("html", {}, [
	t("head", {}, [
		t("title", {}, "Kaboom Demos"),
		t("meta", { charset: "utf-8", }),
		t("style", {}, www.css(css)),
		t("link", { rel: "icon", href: "/img/kaboom.png"}),
		t("script", {}, `window.demos = ${JSON.stringify(demos)}`),
		t("script", { src: "/js/demos.js", type: "module" }, ""),
	]),
	t("body", {}, [
		t("div", { id: "header", }, [
			t("div", {}, [
				t("a", { href: "/", }, [
					t("img", { id: "logo", src: "/img/kaboom.svg", }),
				]),
				t("select", {
					id: "selector",
					name: "demo",
				}, Object.keys(demos).map((name) => {
					return t("option", { selected: name === DEF_DEMO, }, name);
				})),
				t("button", { id: "run", }, "Run"),
			]),
			t("div", {}, [
				t("button", {}, "Reset"),
			]),
		]),
		t("div", { id: "content", }, [
			t("div", { id: "editor", }, []),
			t("iframe", { id: "view", }, []),
		]),
	]),
]);

module.exports = page;