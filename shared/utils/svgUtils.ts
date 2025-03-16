import { defineComponent, h, computed, ref, onMounted, onUnmounted, type PropType } from "vue";

// Define breakpoints
const BREAKPOINTS = {
  md: 768,
  lg: 1024,
};

type SizeProps = {
  base: number | string;
  md?: number | string;
  lg?: number | string;
};

// Utility function to sanitize SVG content
function sanitizeSVG(svgContent: string): string {
  // Remove xml declaration
  svgContent = svgContent.replace(/<\?xml.*?\?>/, '');
  
  // Extract the content inside the <svg> tag
  const svgMatch = svgContent.match(/<svg[^>]*>([\s\S]*?)<\/svg>/i);
  const innerContent = svgMatch ? svgMatch[1] : '';
  
  // Extract viewBox, if present
  const viewBoxMatch = svgContent.match(/viewBox=["']([^"']*)["']/);
  const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 24 24'; // Default viewBox
  
  // Construct the new SVG string, ensuring fill is set to none
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" fill="none">${innerContent}</svg>`;
}

// Utility function to create a Vue component from SVG content
export default function createSVGComponent(svgContent: string) {
  return defineComponent({
    name: "SVGComponent",
    props: {
      size: {
        type: [Number, String, Object] as PropType<number | string | SizeProps>,
        default: 24,
      },
      color: {
        type: String as PropType<string>,
        default: null,
      },
    },
    setup(props) {
      const currentSize = ref<number | string>(
        typeof props.size === 'object' ? props.size.base : props.size
      );

      const updateSize = (): void => {
        if (typeof props.size === 'object') {
          const { base, md, lg } = props.size;
          if (window.innerWidth >= BREAKPOINTS.lg && lg) {
            currentSize.value = lg;
          } else if (window.innerWidth >= BREAKPOINTS.md && md) {
            currentSize.value = md;
          } else {
            currentSize.value = base;
          }
        } else {
          currentSize.value = props.size;
        }
      };

      onMounted(() => {
        updateSize();
        window.addEventListener('resize', updateSize);
      });

      onUnmounted(() => {
        window.removeEventListener('resize', updateSize);
      });

      const svgStyle = computed(() => ({
        width: `${currentSize.value}px`,
        height: `${currentSize.value}px`,
        display: 'inline-block',
      }));

      const sanitizedSvgContent = computed(() => {
        let cleaned = sanitizeSVG(svgContent);
        if (props.color) {
          cleaned = cleaned.replace(/stroke="[^"]*"/g, `stroke="${props.color}"`);
          cleaned = cleaned.replace(/<(path|circle|rect|polygon|ellipse)[^>]*>/g, (match) => {
            if (!match.includes('fill=')) {
              return match.replace('>', ' fill="none">');
            }
            return match;
          });
        }
        return cleaned;
      });

      return { svgStyle, sanitizedSvgContent };
    },
    render() {
      return h("span", { 
        style: this.svgStyle,
        innerHTML: this.sanitizedSvgContent,
        class: "svg-component",
      });
    },
  });
}