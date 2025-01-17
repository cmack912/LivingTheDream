const SectionWrapper = ({ children, ...props }: { children: React.ReactNode, className?: string, id?: string }) => (
    <section {...props} className={`py-16 ${props.className || ""}`}>
        {children}
    </section>
)

export default SectionWrapper