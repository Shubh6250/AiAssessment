import { useState, useEffect, useCallback, useRef } from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CircularProgress,
} from "@mui/material";
import axios from "axios";

interface DogApiResponse {
  message: string[];
  status: string;
}

export const InfiniteScroll = () => {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastImageRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          fetchImages();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading]
  );

  const fetchImages = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get<DogApiResponse>(
        "https://dog.ceo/api/breeds/image/random/5"
      );
      setImages((prevImages) => [...prevImages, ...response.data.message]);
    } catch (err) {
      setError("Failed to fetch images");
      console.error("Error fetching images:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Infinite Scroll
      </Typography>
      {error && (
        <Typography color="error" gutterBottom>
          {error}
        </Typography>
      )}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          },
          gap: 2,
        }}
      >
        {images.map((image, index) => (
          <Box
            key={index}
            ref={index === images.length - 1 ? lastImageRef : null}
          >
            <Card>
              <CardMedia
                component="img"
                height="300"
                image={image}
                alt={`Dog ${index + 1}`}
                sx={{ objectFit: "cover" }}
              />
            </Card>
          </Box>
        ))}
      </Box>
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};
