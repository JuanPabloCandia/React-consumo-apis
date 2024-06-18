// Importamos los hooks useEffect y useState desde React
import { useEffect, useState } from "react";

// Definimos la URL del endpoint para obtener un hecho aleatorio sobre gatos
const CAT_ENDPOINT_RANDOM_FACT = "https://catfact.ninja/fact";

// Definimos el componente funcional App
export function App() {
    // Declaramos el estado 'fact' para almacenar el hecho del gato, inicializado como indefinido (undefined)
    const [fact, setFact] = useState();
    // Declaramos el estado 'imageUrl' para almacenar la URL de la imagen, inicializado como indefinido (undefined)
    const [imageUrl, setImageUrl] = useState();

    // Utilizamos useEffect para realizar efectos secundarios, como llamadas a APIs. 
    // El arreglo vacío [] como segundo argumento asegura que este efecto solo se ejecute una vez al montar el componente.
    useEffect(() => {
        // Hacemos una solicitud fetch al endpoint para obtener un hecho aleatorio sobre gatos
        fetch(CAT_ENDPOINT_RANDOM_FACT)
            .then(res => res.json()) // Convertimos la respuesta a JSON
            .then(data => {
                // Extraemos el campo 'fact' del objeto data
                const { fact } = data;
                // Guardamos el hecho en el estado 'fact'
                setFact(fact);

                // Tomamos las tres primeras palabras del hecho
                const threeFirstWords = fact.split(" ").slice(0, 3).join(" ");
                // Imprimimos las tres primeras palabras en la consola para depuración
                console.log("Three first words:", threeFirstWords);

                // Hacemos otra solicitud fetch para obtener una imagen de gato con las tres primeras palabras
                fetch(`https://cataas.com/cat/says/${threeFirstWords}?fontSize=50&color=red&json=true`)
                    .then(res => res.json()) // Convertimos la respuesta a JSON
                    .then(response => {
                        // Imprimimos la respuesta completa de la API en la consola para depuración
                        console.log("Image response:", response);
                        // Verificamos si la respuesta contiene un campo _id
                        if (response._id) {
                            // Construimos la URL de la imagen usando el _id
                            const imageUrl = `https://cataas.com/cat/${response._id}`;
                            // Imprimimos la URL de la imagen en la consola para depuración
                            console.log("Image URL:", imageUrl);
                            // Guardamos la URL de la imagen en el estado 'imageUrl'
                            setImageUrl(imageUrl);
                        } else {
                            // Imprimimos un mensaje de error en la consola si no se encuentra el campo _id
                            console.error('No se encontró el campo _id en la respuesta de la API de Cataas');
                        }
                    })
                    // Capturamos e imprimimos cualquier error que ocurra durante la solicitud de la imagen
                    .catch(error => console.error('Error fetching image:', error));
            })
            // Capturamos e imprimimos cualquier error que ocurra durante la solicitud del hecho del gato
            .catch(error => console.error('Error fetching cat fact:', error));
    }, []); // El arreglo vacío asegura que este efecto solo se ejecute una vez cuando se monta el componente

    // Retornamos el JSX que se va a renderizar en la pantalla
    return (
        <main>
            <h1>App de gatitos</h1>
            {/* Si 'fact' tiene un valor, renderizamos un párrafo con el hecho */}
            {fact && <p>{fact}</p>}
            {/* Si 'imageUrl' tiene un valor, renderizamos una imagen con la URL */}
            {imageUrl && <img src={imageUrl} alt={`Image extracted using the first three words for ${fact}`} />}
        </main>
    );
}
