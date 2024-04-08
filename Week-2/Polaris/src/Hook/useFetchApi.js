import { useEffect, useState } from 'react';

const useFetchApi = (url) => {
    const [datas, setDatas] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const resp = await fetch(url, { method: "GET" });
                const jsonData = await resp.json();
                setDatas(jsonData.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [url]);
    return { datas, loading, setDatas, setLoading };
};

export default useFetchApi;
