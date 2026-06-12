export const withImageUrl = (req, mundial) => ({
    ...mundial,
    imagen: `${req.protocol}://${req.get("host")}/imagenes/${mundial.imagen}`
});