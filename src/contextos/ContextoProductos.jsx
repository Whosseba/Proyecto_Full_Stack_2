import { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from "./ContextoAuth"; 

export const ContextoProductos = createContext();

export const ProveedorProductos = ({ children }) => {
    const [productos, setProductos] = useState([]); 
    const [cargando, setCargando] = useState(true); 
    const [error, setError] = useState(null);       
    
    const { token } = useAuth(); 
    const API_URL = "http://localhost:8080/api/productos";

    // Cargar productos del Backend al iniciar
    useEffect(() => {
        obtenerProductos();
    }, []);

    const obtenerProductos = async () => {
        setCargando(true);
        setError(null);
        try {
            const res = await fetch(API_URL);
            if (!res.ok) throw new Error("No se pudo conectar con el servidor");
            const data = await res.json();
            setProductos(data);
        } catch (error) {
            console.error("Error cargando productos:", error);
            setError("Error al cargar los productos. Revisa que el Backend esté encendido.");
        } finally {
            setCargando(false); // Terminó de cargar (sea éxito o error)
        }
    };

    // 1. MODIFICADO: Agregar Producto (Acepta FormData)
    // El argumento ahora es el objeto FormData completo.
    const agregarProducto = async (formData) => { 
        try {
            const res = await fetch(API_URL, {
                method: "POST",
                headers: {
                    // IMPORTANTE: ELIMINAMOS "Content-Type": "application/json"
                    // El navegador maneja el Content-Type para FormData automáticamente.
                    "Authorization": `Bearer ${token}`
                },
                // nviamos el objeto FormData directamente
                body: formData 
            });
            
            if (res.ok) {
                const guardado = await res.json();
                setProductos([...productos, guardado]);
                return true; // Éxito
            } else {
                console.error("Error al agregar producto:", res.statusText);
                return false; // Fallo
            }
        } catch (error) { 
            console.error(error); 
            return false;
        }
    };

    // 2. MODIFICADO: Editar Producto (Acepta ID y FormData)
    // Se cambia la firma de la función para recibir el ID y el FormData.
    const editarProducto = async (id, formData) => { 
        try {
            const res = await fetch(`${API_URL}/${id}`, {
                method: "PUT",
                headers: {
                    // IMPORTANTE: ELIMINAMOS "Content-Type": "application/json"
                    "Authorization": `Bearer ${token}`
                },
                // Enviamos el objeto FormData directamente
                body: formData 
            });
            
            if (res.ok) {
                const actualizado = await res.json();
                setProductos(productos.map(p => p.id === actualizado.id ? actualizado : p));
                return true; // Éxito
            } else {
                console.error("Error al editar producto:", res.statusText);
                return false; // Fallo
            }
        } catch (error) { 
            console.error(error); 
            return false;
        }
    };

    // 3. Eliminación (Sin cambios, ya estaba bien)
    const eliminarProducto = async (id) => {
        try {
            const res = await fetch(`${API_URL}/${id}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (res.ok) {
                setProductos(productos.filter(p => p.id !== id));
                return true; // Éxito
            } else {
                 return false;
            }
        } catch (error) { 
            console.error(error); 
            return false;
        }
    };

    return (
        <ContextoProductos.Provider value={{ 
            productos, 
            cargando, 
            error,    
            obtenerProductos, // Se recomienda exponer esta función por si necesitas recargar
            agregarProducto, 
            editarProducto, 
            eliminarProducto 
        }}>
            {children}
        </ContextoProductos.Provider>
    );
};

export const useProductos = () => useContext(ContextoProductos);