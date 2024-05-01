export const TEMP_BOARD_ID = "663247fdeb4879a60b247b5d" // TODO: TEMP_ID for test
export const TITLE = "Trello"
export const DESCRIPTION = "Trello app for me :)"

// TODO: Why i need to provide the quotation marks in the binding's string value
// ! https://github.com/vuejs/core/issues/4880#issuecomment-956112458
export const EMPTY_COLUMN_TEXT = "'Column is empty.'"

export const HEIGHT = {
  COLUMN_HEADER: "50px",
  COLUMN_FOOTER: "56px",
  CARD_ACTION: "40px",
  BOARD_BAR: "50px",
  APP_BAR: "64px"
}

export const BOARD_CONTENT_HEIGHT = `calc(100vh - ${HEIGHT.APP_BAR} - ${HEIGHT.BOARD_BAR})`
export const BOARD_CONTENT_LIST_CARD_HEIGHT = `calc(${BOARD_CONTENT_HEIGHT} - ${HEIGHT.COLUMN_FOOTER} - ${HEIGHT.COLUMN_HEADER})`

export default { HEIGHT }
