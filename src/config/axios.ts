import axios from 'axios';
/**
 *
 *
 * @export
 * @class AxiosHelper
 */
export default class AxiosHelper {
  /**
	 *
	 *
	 * @static
	 * @param {string} url
	 * @param {{
	 *     headers: any
	 *   }} config
	 * @returns
	 * @memberof AxiosHelper
	 */
  static get(
    url: string,
    config: {
      headers: any;
    }
  ) {
    return axios
      .get(url, config)
      .then((response) => response)
      .catch(() => null);
  }

  /**
	 *
	 *
	 * @static
	 * @param {string} url
	 * @param {*} data
	 * @param {*} config
	 * @returns
	 * @memberof AxiosHelper
	 */
  static post(url: string, data: any, config: any) {
    return axios
      .post(url, data, config)
      .then((response) => response)
      .catch((e) => null);
  }
}
