declare module "*.md" {
  // "unknown" would be more detailed depends on how you structure frontmatter
  const attributes: {
    title: string;
    notes?: string[];
    [key: string]: unknown;
  };

  // When "Mode.HTML" is requested
  const html: string;

  // Modify below per your usage
  export { attributes, toc, html };
}
