import { toast } from 'react-toastify';

import { MAP_UNAVAILABLE_STR, QUERY_MAP } from './strings';

/**
 * The purpose of this file is to centralize the toasts in use in the application in one location. This should allow us to minimize duplication of toast messages using toastIds. https://fkhadra.github.io/react-toastify/prevent-duplicate
 * In the future we may need to split this file out (at least into /features).
 */

/** These toasts are used by the update user api */
const USER_UPDATING_TOAST_ID = 'UPDATING_USER';
const USER_UPDATING = () => toast.dark('Updating User...', { toastId: USER_UPDATING_TOAST_ID });
const USER_UPDATED_TOAST_ID = 'USER_UPDATED';
const USER_UPDATED = () => toast.dark('User updated', { toastId: USER_UPDATED_TOAST_ID });
const USER_ERROR_TOAST_ID = 'USER_ERROR';
const USER_ERROR = () => toast.error('Failed to update User', { toastId: USER_ERROR_TOAST_ID });
export const user = {
  USER_UPDATING_TOAST_ID,
  USER_UPDATING,
  USER_UPDATED_TOAST_ID,
  USER_UPDATED,
  USER_ERROR_TOAST_ID,
  USER_ERROR,
};

/** These toasts are used by the parcel detail api */
//creating
const PARCEL_CREATING_TOAST_ID = 'CREATING_PARCEL';
const PARCEL_CREATING = () =>
  toast.dark('Creating Parcel...', { toastId: PARCEL_CREATING_TOAST_ID });
const PARCEL_CREATED_TOAST_ID = 'CREATED_PARCEL';
const PARCEL_CREATED = () => toast.dark('Parcel created.', { toastId: PARCEL_CREATED_TOAST_ID });
const PARCEL_CREATING_ERROR_TOAST_ID = 'PARCEL_CREATING_ERROR';
const PARCEL_CREATING_ERROR = () =>
  toast.error('Failed to create Parcel.', { toastId: PARCEL_CREATING_ERROR_TOAST_ID });
//updating
const PARCEL_UPDATING_TOAST_ID = 'UPDATING_PARCEL';
const PARCEL_UPDATING = () =>
  toast.dark('Updating Parcel...', { toastId: PARCEL_UPDATING_TOAST_ID });
const PARCEL_UPDATED_TOAST_ID = 'UPDATED_PARCEL';
const PARCEL_UPDATED = () => toast.dark('Parcel updated.', { toastId: PARCEL_UPDATED_TOAST_ID });
const PARCEL_UPDATING_ERROR_TOAST_ID = 'PARCEL_UPDATING_ERROR';
const PARCEL_UPDATING_ERROR = () =>
  toast.error('Failed to update Parcel.', { toastId: PARCEL_UPDATING_ERROR_TOAST_ID });
//deleting
const PARCEL_DELETING_TOAST_ID = 'DELETING_PARCEL';
const PARCEL_DELETING = () =>
  toast.dark('Deleting Parcel...', { toastId: PARCEL_DELETING_TOAST_ID });
const PARCEL_DELETED_TOAST_ID = 'DELETED_PARCEL';
const PARCEL_DELETED = () => toast.dark('Parcel deleted.', { toastId: PARCEL_DELETED_TOAST_ID });
const PARCEL_DELETING_ERROR_TOAST_ID = 'PARCEL_DELETING_ERROR';
const PARCEL_DELETING_ERROR = () =>
  toast.error('Failed to delete Parcel.', { toastId: PARCEL_DELETING_ERROR_TOAST_ID });
export const parcel = {
  PARCEL_CREATING_TOAST_ID,
  PARCEL_CREATING,
  PARCEL_CREATED_TOAST_ID,
  PARCEL_CREATED,
  PARCEL_CREATING_ERROR_TOAST_ID,
  PARCEL_CREATING_ERROR,
  PARCEL_UPDATING_TOAST_ID,
  PARCEL_UPDATING,
  PARCEL_UPDATED_TOAST_ID,
  PARCEL_UPDATED,
  PARCEL_UPDATING_ERROR_TOAST_ID,
  PARCEL_UPDATING_ERROR,
  PARCEL_DELETING_TOAST_ID,
  PARCEL_DELETING,
  PARCEL_DELETED_TOAST_ID,
  PARCEL_DELETED,
  PARCEL_DELETING_ERROR_TOAST_ID,
  PARCEL_DELETING_ERROR,
};

/** These toasts are used by the update organization api */
const ORGANIZATION_UPDATING_TOAST_ID = 'UPDATING_ORGANIZATION';
const ORGANIZATION_UPDATING = () =>
  toast.dark('Updating Organization...', { toastId: ORGANIZATION_UPDATING_TOAST_ID });
const ORGANIZATION_UPDATED_TOAST_ID = 'ORGANIZATION_UPDATED';
const ORGANIZATION_UPDATED = () =>
  toast.dark('Organization updated', { toastId: ORGANIZATION_UPDATED_TOAST_ID });
const ORGANIZATION_ERROR_TOAST_ID = 'ORGANIZATION_ERROR';
const ORGANIZATION_ERROR = () =>
  toast.error('Failed to update Organization', { toastId: USER_ERROR_TOAST_ID });
export const organization = {
  ORGANIZATION_UPDATING_TOAST_ID,
  ORGANIZATION_UPDATING,
  ORGANIZATION_UPDATED_TOAST_ID,
  ORGANIZATION_UPDATED,
  ORGANIZATION_ERROR_TOAST_ID,
  ORGANIZATION_ERROR,
};

/** These toasts are used to display bc data warehouse loading */
const LAYER_DATA_LOADING_ID = 'LOADING_LAYER_DATA';
const LAYER_DATA_LOADING = () => toast.dark(QUERY_MAP, { toastId: LAYER_DATA_LOADING_ID });
const LAYER_DATA_ERROR_ID = 'LAYER_DATA_ERROR_ID';
const LAYER_DATA_ERROR = () => toast.error(MAP_UNAVAILABLE_STR, { toastId: LAYER_DATA_ERROR_ID });
export const layerData = {
  LAYER_DATA_LOADING_ID,
  LAYER_DATA_LOADING,
  LAYER_DATA_ERROR_ID,
  LAYER_DATA_ERROR,
};
