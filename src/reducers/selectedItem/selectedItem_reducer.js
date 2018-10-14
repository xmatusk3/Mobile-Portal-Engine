import { SELECTEDITEM_SELECT_ITEM, WORKFLOWS_UPDATE_ITEM } from '../../actions/types';

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
    default:
      return state;
  } 
};