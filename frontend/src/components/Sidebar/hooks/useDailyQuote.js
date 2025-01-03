import { useState, useCallback } from 'react';

export const useDailyQuote = () => {
  const [quote, setQuote] = useState(null);

  const fetchRandomQuote = useCallback(async () => {
    try {
      const response = await fetch('https://api.api-ninjas.com/v1/quotes', {
        headers: {
          'X-Api-Key': 'Xs82lP7RTVW4bbKb05W3BQ==6MBhoQrsq40stCdg',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data[0].quote;
    } catch (error) {
      return 'Не вдалося завантажити цитату.';
    }
  }, []);

  const loadDailyQuote = useCallback(async () => {
    const savedQuote = localStorage.getItem('dailyQuote');
    const savedDate = localStorage.getItem('quoteDate');
    const today = new Date().toDateString();

    if (savedQuote && savedDate === today) {
      setQuote(savedQuote);
    } else {
      const randomQuote = await fetchRandomQuote();
      setQuote(randomQuote);
      localStorage.setItem('dailyQuote', randomQuote);
      localStorage.setItem('quoteDate', today);
    }
  }, [fetchRandomQuote]);

  return { quote, loadDailyQuote };
};
