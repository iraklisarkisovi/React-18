import React, { useState, useEffect, useMemo, startTransition } from 'react';

function HeavyFetching() {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');
    const [isPending, setIsPending] = useState(false);
    
    const fetchData = async () => {
        try {
            const res = await fetch('https://jsonplaceholder.typicode.com/photos');
            if (!res.ok) {
                throw new Error('404 Not Found');
            }
            const fetchedData = await res.json();
            setData(fetchedData);
        } catch (error) {
            console.log('Error:', error.message);
            setError(error.message);
        }
    };

    const filteredData = useMemo(() => {
        console.log('Filtering data');
        return data.filter(item => item.title.toLowerCase().includes(search.toLowerCase()));
    }, [data, search]);

    const handleSearchChange = (e) => {
        setIsPending(true);
        startTransition(() => {
            setSearch(e.target.value);
            setIsPending(false);
        });
    };

    return (
        <div>
            <h1>Fetched Data</h1>
            <input 
                type="text" 
                placeholder="Search data" 
                value={search} 
                onChange={handleSearchChange} 
            />
            <button onClick={fetchData}>Fetch data!</button>
            {error ? (
                <p>{error}</p>
            ) : (
                isPending ? (
                    <p>Loading...</p>
                ) : (
                    filteredData.slice(0, 10).map((item) => (
                        <div key={item.id}>
                            <p>{item.title}</p>
                        </div>
                    ))
                )
            )}
        </div>
    );
}

export default HeavyFetching;
