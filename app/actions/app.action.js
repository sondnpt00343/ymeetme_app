const INIT_APP = 'app/INIT_APP'

const INITIAL_STATE = {
  initApp: false,
  lang: null,
}

export default function appReducer(state = INITIAL_STATE, action){
  switch (action.type) {
    case INIT_APP:
      return {
        ...state,
        initApp: true,
      }
    default:
      return state
  }
}

export const initApp = () => ({
  type: INIT_APP,
})