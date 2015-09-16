package com.hb.guru;

import java.util.Map;

public interface Downloader
{
	Map<String, StatServer> download(String url);
}
