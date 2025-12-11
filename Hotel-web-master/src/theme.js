import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
const APP_BAR_HEIGHT = '78px'
const BOARD_BAR_HEIGHT = '600px'
const BOARD_FOOTER_HEIGHT = '306px'
const BOARD_CONTENT_HEIGHT = `calc(100vh - ${APP_BAR_HEIGHT} - ${BOARD_BAR_HEIGHT} - ${BOARD_FOOTER_HEIGHT})`
const theme = extendTheme({
    hotel:{
        appBarHeight: APP_BAR_HEIGHT,
        boardBarHeight: BOARD_BAR_HEIGHT,
        boardContentHeight: BOARD_CONTENT_HEIGHT,
        boardFooterHeight: BOARD_FOOTER_HEIGHT
    }

})

export default theme    