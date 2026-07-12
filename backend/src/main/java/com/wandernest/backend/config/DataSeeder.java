package com.wandernest.backend.config;

import com.wandernest.backend.entity.Cabin;
import com.wandernest.backend.entity.CabinImage;
import com.wandernest.backend.enums.CabinStatus;
import com.wandernest.backend.repository.CabinRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.math.BigDecimal;
import java.util.List;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner seedCabins(CabinRepository cabinRepository) {
        return arguments -> {
            if (cabinRepository.count() > 0) {
                return;
            }

            List<Cabin> cabins = List.of(
                    cabin("The Cedar Ridge Retreat", "Shimla", "A sunlit cedar cabin with valley views, a fireplace, and peaceful forest trails right outside the door.", "8500", 4, 2, 2, 4.8, "Aarav Mehta", "photo-1500530855697-b586d89ba3ee"),
                    cabin("Pinecrest Mountain Lodge", "Manali", "A warm alpine hideaway with snow-peaked views, a private deck, and cosy evenings by the fire.", "9200", 6, 3, 3, 4.9, "Kavya Sharma", "photo-1519681393784-d120267933ba"),
                    cabin("Coconut Cove Villa", "Goa", "A relaxed coastal stay surrounded by palms, with a plunge pool and an easy walk to the beach.", "11000", 6, 3, 3, 4.7, "Rohan D'Souza", "photo-1507525428034-b723cf961d3e"),
                    cabin("Amber Haveli Retreat", "Jaipur", "A refined heritage-inspired retreat with warm sandstone details, a courtyard, and city sunsets.", "7800", 4, 2, 2, 4.6, "Meera Rathore", "photo-1477587458883-47145ed94245"),
                    cabin("Lake Pichola House", "Udaipur", "An elegant lakeside stay with a serene terrace, handcrafted interiors, and unforgettable evening views.", "10500", 5, 2, 2, 4.9, "Devendra Singh", "photo-1470214304380-aadaedcfff1b"),
                    cabin("Parvati Valley Cabin", "Kasol", "A secluded timber cabin beside the river, made for slow mornings, hiking, and stargazing nights.", "6800", 4, 2, 1, 4.7, "Tenzin Norbu", "photo-1449158743715-0a90ebb6d2d8"),
                    cabin("Cloudline Cottage", "Mussoorie", "A charming hillside cottage with misty views, a reading nook, and a garden made for tea at sunrise.", "7600", 4, 2, 2, 4.8, "Ishita Kapoor", "photo-1448375240586-882707db888b"),
                    cabin("Emerald Lake Chalet", "Nainital", "A quiet chalet near the lake with a wraparound balcony and a welcoming fireplace lounge.", "8900", 5, 2, 2, 4.8, "Nikhil Joshi", "photo-1501785888041-af3ef285b470"),
                    cabin("Nilgiri Glass House", "Ooty", "A contemporary glass-fronted cottage set among tea gardens, with cool air and sweeping green views.", "8300", 4, 2, 2, 4.6, "Ananya Iyer", "photo-1464822759023-fed622ff2c3b"),
                    cabin("Cardamom Forest Villa", "Munnar", "A peaceful plantation villa surrounded by cardamom and tea estates, with generous spaces for families.", "9800", 6, 3, 3, 4.9, "Arjun Nair", "photo-1500534623283-312aade485b7")
            );

            cabinRepository.saveAll(cabins);
        };
    }

    private Cabin cabin(
            String title,
            String location,
            String description,
            String price,
            int capacity,
            int bedrooms,
            int bathrooms,
            double rating,
            String hostName,
            String imageId
    ) {
        Cabin cabin = new Cabin();
        cabin.setTitle(title);
        cabin.setLocation(location);
        cabin.setDescription(description);
        cabin.setPricePerNight(new BigDecimal(price));
        cabin.setCapacity(capacity);
        cabin.setBedrooms(bedrooms);
        cabin.setBathrooms(bathrooms);
        cabin.setRating(rating);
        cabin.setHostName(hostName);
        cabin.setStatus(CabinStatus.AVAILABLE);

        CabinImage image = new CabinImage();
        image.setCabin(cabin);
        image.setPrimaryImage(true);
        image.setImageUrl("https://images.unsplash.com/" + imageId + "?auto=format&fit=crop&w=1600&q=85");
        cabin.getImages().add(image);

        return cabin;
    }
}
