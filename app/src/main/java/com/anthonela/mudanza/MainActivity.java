package com.anthonela.mudanza;

import android.app.Activity;
import android.app.AlertDialog;
import android.os.Bundle;
import android.speech.tts.TextToSpeech;
import android.view.View;
import android.webkit.JavascriptInterface;
import android.webkit.JsResult;
import android.webkit.WebChromeClient;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import java.util.Locale;

public class MainActivity extends Activity {
    private TextToSpeech tts;
    private boolean ttsReady = false;
    private String pendingSpeech = null;
    private void speakText(String text) {
        if (!ttsReady || tts == null) { pendingSpeech = text; return; }
        tts.speak(text, TextToSpeech.QUEUE_FLUSH, null, "dialogue");
    }
    private class SpeechBridge {
        @JavascriptInterface public void speak(String text) {
            if (text == null || text.length() > 500) return;
            runOnUiThread(() -> speakText(text));
        }
        @JavascriptInterface public void stop() {
            runOnUiThread(() -> { pendingSpeech = null; if (tts != null) tts.stop(); });
        }
    }
    @Override public void onCreate(Bundle state) {
        super.onCreate(state);
        tts = new TextToSpeech(this, status -> {
            if (status == TextToSpeech.SUCCESS) {
                ttsReady = true;
                tts.setLanguage(new Locale("es", "PE"));
                if (pendingSpeech != null) { String text = pendingSpeech; pendingSpeech = null; speakText(text); }
            }
        });
        getWindow().getDecorView().setSystemUiVisibility(
            View.SYSTEM_UI_FLAG_FULLSCREEN | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION |
            View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY | View.SYSTEM_UI_FLAG_LAYOUT_STABLE |
            View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN);
        WebView game = new WebView(this);
        game.getSettings().setJavaScriptEnabled(true);
        game.getSettings().setDomStorageEnabled(true);
        game.addJavascriptInterface(new SpeechBridge(), "AntonellaSpeech");
        game.setWebViewClient(new WebViewClient());
        game.setWebChromeClient(new WebChromeClient() {
            @Override public boolean onJsConfirm(WebView view, String url, String message, JsResult result) {
                new AlertDialog.Builder(MainActivity.this).setMessage(message)
                    .setPositiveButton("Continuar", (dialog, which) -> result.confirm())
                    .setNegativeButton("Cancelar", (dialog, which) -> result.cancel())
                    .setOnCancelListener(dialog -> result.cancel()).show();
                return true;
            }
        });
        setContentView(game);
        game.loadUrl("file:///android_asset/index.html");
    }
    @Override protected void onDestroy() {
        if (tts != null) { tts.stop(); tts.shutdown(); tts = null; }
        super.onDestroy();
    }
}
