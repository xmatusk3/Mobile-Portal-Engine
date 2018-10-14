import _ from 'lodash';
import {
  WORKFLOWS_SAVE_ITEMS,
  WORKFLOWS_UPDATE_ITEM,
} from '../../actions/types';

const INIT_STATE = {};

export default (state = INIT_STATE, { type, payload }) => {
  switch (type) {
    case WORKFLOWS_SAVE_ITEMS:
      return { ...payload };
    case WORKFLOWS_UPDATE_ITEM:
      const displayName = payload.currentWorkflowStep.workflowStepDisplayName
      if (displayName === "Published" || displayName === "Edit") {
        return _.omit(state, [`${payload.documentID}`]);
      }
      return {
        ...state,
        [payload.documentID]: { ...payload },
      };
    default:
      return state;
  }
};
