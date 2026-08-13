import packageJson from "../../package.json";

const currentYear = new Date().getFullYear();

export const APP_CONFIG = {
  name: "Second Opinion",
  version: packageJson.version,
  copyright: `© ${currentYear}, Second Opinion.`,
  meta: {
    title: "Second Opinion – Expert Medical Second Opinions Online",
    description:
      "Get trusted medical second opinions from verified doctors. Upload reports, consult specialists, and make informed healthcare decisions—all from the comfort of your home.",
  },
};
