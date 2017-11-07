package com.iosproject;

import android.os.Bundle;

import com.facebook.react.ReactActivity;

import cn.jpush.im.android.api.JMessageClient;

public class MainActivity extends ReactActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        JMessageClient.init(getApplicationContext(), true);
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "IosProject";
    }
}
