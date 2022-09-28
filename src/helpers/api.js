import { getUrlParameter } from '../helpers/functions';

const siteURLs = {
  'staging': 'https://wp-staging.hundredheads.co.uk',
  'live': 'https://wp.hundredheads.co.uk' 
}
const host = window.location.host;
const is_local = host.indexOf('localhost') > -1;
const is_staging_subdomain = host.split('.')[0] === 'staging';
const versionParam = getUrlParameter('version');
const defaultVersion = is_local || is_staging_subdomain ? 'staging' : 'live';
const version = !!versionParam & !!siteURLs[versionParam] ? versionParam : defaultVersion;
const staging = version === 'staging';
const accessKey = getUrlParameter('access_key');

const siteURL = staging ? siteURLs.staging : siteURLs.live;
const wpRestURL = siteURL + '/wp-json/wp/v2';
const authURL = siteURL + '/wp-json/simple-jwt-authentication/v1';
const hhURL = siteURL + '/wp-json/hh/v1';

export const tokenURL = authURL + '/token';
export const validateTokenURL = authURL + '/token/validate';
export const revokeTokenURL = authURL + '/token/revoke';
export const forgottenPasswordURL = authURL + '/token/resetpassword';
export const userRegisterURL = wpRestURL + '/users/register' + (!!accessKey ? `?access_key=${ accessKey }` : '');
export const userURL = wpRestURL + '/users/me';
export const postURL = wpRestURL + '/posts';
export const artistURL = wpRestURL + '/artists?per_page=100';
export const settingsURL = hhURL + '/registrationsettings' + (!!accessKey ? `?access_key=${ accessKey }` : '');
export const changePasswordURL = hhURL + '/change_password';
export const wpSiteURL = siteURL;
