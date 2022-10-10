export const options = {
    components: {
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    color: '#7F92A0',
                    '*': {color: '#7F92A0',},
                    "&:hover": {
                        backgroundColor: "rgba(127,146,160,0.08)",
                        color: "white",
                        "*": {
                            color: "white"
                        }
                    },
                    "&.Mui-selected": {
                        backgroundColor: "rgba(127,146,160,0.08)",
                        color: "white",
                        "*": {
                            color: "white",
                            // backgroundColor: "rgba(127,146,160,0.08)",
                        }
                    },
                    "&.Mui-selected:hover": {
                        backgroundColor: "rgba(127,146,160,0.08)",
                        color: "white",
                        "*": {
                            color: "white"
                        }
                    }
                },
                selected: {}
            }
        },
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    color: "#FFF",
                    backgroundColor: "#262626"
                },
                arrow: {
                    color: "#262626"
                }
            }
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    // '&:hover': {
                    //     borderColor: 'red',
                    //     "*": {
                    //         borderColor: 'red',
                    //     }
                    // },
                }
            }
        }
    },
    typography: {
        fontFamily: [
            'Golos Text'
        ].join(','),
    },

    palette: {
        text: {
            primary: '#262626',
            secondary: '#7F92A0'
        },
        primary: {
            light: '#4ab3f4',
            main: '#1DA1F2',
            dark: '#1470a9',
            contrastText: '#fff',
        },
        secondary: {
            light: '#98a7b3',
            main: '#7F92A0',
            dark: '#586670',
            contrastText: '#262626',
        },
        error: {
            light: '#ff7b7f',
            main: '#FF5A5F',
            dark: '#b23e42',
            contrastText: '#fff',
        },
        warning: {
            light: '#fdab69',
            main: '#FD9644',
            dark: '#b1692f',
            contrastText: '#fff',
        },
        success: {
            light: '#55d5c7',
            main: '#2BCBBA',
            dark: '#1e8e82',
            contrastText: '#fff',
        },
    },
}