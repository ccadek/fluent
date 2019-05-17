import _ from "lodash";
import GoatExportUtilities from "./utils";
import FormioComponent from "./components/formio";

// Import export plugins
import { toHtml, toPdf, toXlsx } from "./plugins";

/**
 * Class for exporting formio components into different formats
 *
 * @class GoatExport
 */
class GoatExport {
  /**
   * Creates an instance of GoatExport.
   * @param {any} component The formio component
   * @param {any} data The formio component data
   * @param {any} [options={}] Formio optional parameters
   * @memberof GoatExport
   */
  constructor(component, data, options = {}) {
    if (!(this instanceof GoatExport)) {
      return new GoatExport(component, data);
    }

    this.component = null;
    this.data = {};
    this.options = {};

    if (options.hasOwnProperty("formio")) {
      this.options = _.cloneDeep(options.formio);
    }

    if (options.hasOwnProperty("component")) {
      this.component = options.component;
    } else if (component) {
      this.component = component;
    }

    if (options.hasOwnProperty("data")) {
      this.data = options.data;
    } else if (!_.isNil(data)) {
      this.data = data;
    }

    if (GoatExportUtilities.isFormioSubmission(this.data)) {
      this.options.submission = {
        id: this.data._id,
        owner: this.data.owner,
        modified: this.data.modified
      };
      this.data = this.data.data;
    }

    if (this.component) {
      if (
        GoatExportUtilities.isFormioForm(this.component) ||
        GoatExportUtilities.isFormioWizard(this.component)
      ) {
        this.component.type = "form";
        this.component.display = "form";
      }
      this.component = FormioComponent.create(
        component || this.component,
        this.data,
        this.options
      );
    } else if (!this.component) {
      console.warn(this.constructor.name, "no component defined");
    }
  }

  /**
   * Renders the formio component to HTML
   *
   * @returns {Promise} The promise containing the HTML render of the formio component
   * @memberof GoatExport
   */
  toHtml() {
    return new Promise((resolve, reject) => {
      try {
        toHtml(this.component).then(html => resolve(html));
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Exports the formio component to a jsPDF object
   *
   * @param {any} [config={}] The Html2PDf configuration
   * @returns {Promise} The promise containing the jsPDF object
   * @memberof GoatExport
   */
  toPdf(config = {}) {
    return new Promise((resolve, reject) => {
      try {
        this.toHtml().then(source => {
          toPdf()
            .from(source)
            .save();
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Exports the formio component to a xlsx object
   *
   * @param {any} [config={}] The xlsx configuration
   * @returns {Promise} The promise containing the xlsx object
   * @memberof GoatExport
   */
  toXlsx(config = {}) {
    return new Promise((resolve, reject) => {
      try {
        toXlsx(config).then(xlsx => resolve(xlsx));
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Renders the formio component to HTML
   *
   * @param {any} options The GoatExport options
   * @returns {Promise} The promise containing the HTML render of the formio component
   * @memberof GoatExport
   */
  static toHtml(options) {
    return new Promise((resolve, reject) => {
      try {
        options = GoatExportUtilities.verifyProperties(options, {
          component: {
            type: Object,
            required: true
          },
          formio: {
            type: Object
          }
        });
        new GoatExport(options.component, options.data, options.formio)
          .toHtml()
          .then(html => {
            resolve(html);
          });
      } catch (error) {
        console.error(error);
        reject(error);
      }
    });
  }

  /**
   * Exports the formio component to a jsPDF object
   *
   * @param {any} options The GoatExport configuration
   * @returns {Promise} The promise containing the jsPDF object
   * @memberof GoatExport
   */
  static toPdf(options) {
    return new Promise((resolve, reject) => {
      try {
        options = GoatExportUtilities.verifyProperties(options, {
          component: {
            type: Object,
            required: true
          },
          formio: {
            type: Object
          },
          config: {
            type: Object,
            default: {
              filename: `export-${Math.random()
                .toString(36)
                .substring(7)}.pdf`
            }
          }
        });
        new GoatExport(options.component, options.data, options.formio)
          .toPdf(options.config)
          .then(pdf => {
            resolve(pdf);
          });
      } catch (error) {
        console.error(error);
        reject(error);
      }
    });
  }

  /**
   * Exports the formio component to a xlsx object
   *
   * @param {any} options The GoatExport configuration
   * @returns {Promise} The promise containing the xlsx object
   * @memberof GoatExport
   */
  static toXlsx(options) {
    return new Promise((resolve, reject) => {
      try {
        options = GoatExportUtilities.verifyProperties(options, {
          component: {
            type: Object,
            required: true
          },
          formio: {
            type: Object
          },
          config: {
            type: Object
          }
        });
        new GoatExport(options.component, options.data, options.formio)
          .toXlsx(options.config)
          .then(xlsx => {
            resolve(xlsx);
          });
      } catch (error) {
        console.error(error);
        reject(error);
      }
    });
  }
}

export default GoatExport;
