import _ from 'lodash';

import { 
  SELECTEDITEM_SELECT_ITEM, 
  WORKFLOWS_UPDATE_ITEM, 
  PAGES_SAVE_METADATA, 
  PAGES_SAVE_METADATA_UI,
  PAGES_SAVE_GENERAL_PROPERTIES,
  PAGES_UPDATE_GENERAL_PROPERTIES
} from '../../actions/types';

const INIT_STATE = {};

export default (state = INIT_STATE, { type, payload }) => {
  switch (type) {
    case WORKFLOWS_UPDATE_ITEM:
      const displayName = payload.currentWorkflowStep.workflowStepDisplayName
      if (displayName === "Published" || displayName === "Edit") {
        return {...INIT_STATE};
      }
      return { ...payload };
    case SELECTEDITEM_SELECT_ITEM:
      return { ...payload };
    case PAGES_SAVE_METADATA:
      return {
        ...state,
        metadata: _.omit(payload, ['documentID'])
      }
    case PAGES_SAVE_METADATA_UI:
      return {
        ...state,
        metadata: {
          ...state.metadata,
          ...payload.metadata
        }
      }
    case PAGES_SAVE_GENERAL_PROPERTIES:
      return {
        ...state,
        generalProperties: {
          ...state.generalProperties,
          ...payload
        }
      }
    case PAGES_UPDATE_GENERAL_PROPERTIES:
      return {
        ...state,
        generalProperties: {
          ...state.generalProperties,
          [payload.propertiesSectionIdentifier]: {
            ...state.generalProperties[payload.propertiesSectionIdentifier],
            ...payload.data
          }
        }
      }
    default:
      return state;
  } 
};
