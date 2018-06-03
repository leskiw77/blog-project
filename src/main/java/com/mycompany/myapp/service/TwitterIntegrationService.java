package com.mycompany.myapp.service;

import com.mycompany.myapp.service.dto.EntryResponseDTO;
import org.springframework.stereotype.Service;
import twitter4j.*;
import twitter4j.conf.ConfigurationBuilder;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.LinkedList;
import java.util.List;

@Service
public class TwitterIntegrationService {
    private Twitter twitter;

    private final String consumerKey = "f3x5PjlDduZ60QQkxVVH9jtFE";
    private final String consumerSecret = "c8pTQB0cfCDyqz2e52qBvYlKngG89VCVvNGSK0vLy8EIDmxaML";
    private final String accessToken = "1001841856794243072-pwBeyFDARRfNJC2QaOhWXluIOWdmQX";
    private final String accessTokenSecret = "ZOrHanGAaNGpb35dYyHZLINENkTyqNg5tLmLECoe8rGnW";


    public TwitterIntegrationService() {
        ConfigurationBuilder cb = new ConfigurationBuilder();
        cb.setDebugEnabled(true)
            .setOAuthConsumerKey(consumerKey)
            .setOAuthConsumerSecret(consumerSecret)
            .setOAuthAccessToken(accessToken)
            .setOAuthAccessTokenSecret(accessTokenSecret);
        TwitterFactory tf = new TwitterFactory(cb.build());
        twitter = tf.getInstance();
    }

    public List<EntryResponseDTO> getStatusesForListOfTags(List<String> tags){
        List<EntryResponseDTO> statuses = new LinkedList<>();

        for(String tag : tags){
            List<EntryResponseDTO> s = getStatusesForTag(tag);
            if(s != null){
                statuses.addAll(s);
            }
        }
        return statuses;
    }

    private List<EntryResponseDTO> getStatusesForTag(String tag){
        try {
            long id = 1;
            QueryResult result = twitter.search(new Query("#" + tag));
            List<EntryResponseDTO> entries = new LinkedList<>();
            for(Status e : result.getTweets()){
                String text = e.getText();
                LocalDateTime creationDateTime = e.getCreatedAt().toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime();
                String creatorLogin = e.getUser().getScreenName();
                String title = "twitter post with tag:  " + tag;
                id ++;
                entries.add(new EntryResponseDTO(-id, title, creationDateTime, creatorLogin, text));
            }
            return entries;
        } catch (TwitterException te) {
            te.printStackTrace();
            return null;
        }
    }
}
