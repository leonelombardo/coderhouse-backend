export const notification = (text, type="success") => {
    Toastify({
        text: text,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "#202c33",
            color: "#fff",
            outline: "none",
            border: "none",
            borderRadius: "6px",
            boxShadow: "none",
            display: "flex",
            alignItems: "center",
            gap: "12px"
        }
        }).showToast();
}