Ext.define("LoginIntegration.view.Main", {
    extend: 'Ext.tab.Panel',
    xtype: 'main_panel',

    config: {
        tabBarPosition: 'bottom',

        items: [
            {
                title: 'Welcome',
                iconCls: 'home',

                styleHtmlContent: true,
                scrollable: true,

                items: {
                    docked: 'top',
                    xtype: 'titlebar',
                    title: 'Welcome to Login Integration'
                },

                html: [
                    "You are already logged in."
                ].join("")
            }
        ]
    }
});
