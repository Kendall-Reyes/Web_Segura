export default function Alert({ type = "info", message }) {
    const styles = {
        success: "bg-[#ECFDF5] text-[#059669] border-[#059669]",
        error: "bg-[#FEF2F2] text-[#DC2626] border-[#DC2626]",
        warning: "bg-[#FFFBEB] text-[#D97706] border-[#D97706]",
        info: "bg-[#EFF6FF] text-[#0EA5E9] border-[#0EA5E9]",
    };

    return (
        <div
            className={`w-full border rounded-lg px-4 py-2 text-sm mb-4 ${styles[type]}`}
        >
            {message}
        </div>
    );
}