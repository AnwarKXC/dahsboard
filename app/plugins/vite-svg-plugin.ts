import { defineNuxtPlugin } from "#app";
import type { Plugin } from "vite";
import fs from "fs";
import path from "path";

function createViteSvgPlugin(): Plugin {
	const svgComponents: Record<string, string> = {};

	return {
		name: "vite-svg-plugin",
		enforce: "pre",

		resolveId(id) {
			if (id.startsWith("virtual:svg-component/")) {
				return id;
			}
		},

		load(id) {
			if (id.startsWith("virtual:svg-component/")) {
				const componentName = id.slice("virtual:svg-component/".length);
				return svgComponents[componentName];
			}
		},

		transform(code, id) {
			if (id.endsWith(".svg")) {
				const svgContent = fs.readFileSync(id, "utf-8");
				const componentName = path.basename(id, ".svg");
				const componentCode = `
          import { createSVGComponent } from '@/utils/svg'
          export default createSVGComponent(\`${svgContent.replace(/`/g, "\\`")}\`)
        `;
				svgComponents[componentName] = componentCode;
				return `export default 'virtual:svg-component/${componentName}'`;
			}
		},
	};
}

export default defineNuxtPlugin((nuxtApp: any) => {
	// Add the Vite plugin using Nuxt's hook system
	nuxtApp.hook("vite:extendConfig", (config: { plugins?: Plugin[] }) => {
		config.plugins = config.plugins || [];
		config.plugins.push(createViteSvgPlugin());
	});

	// You can still return an object to expose anything to the rest of your Nuxt app if needed
	return {
		provide: {
			svgPlugin: createViteSvgPlugin,
		},
	};
});
