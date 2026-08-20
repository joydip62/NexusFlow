import FlowCanvas from "../components/FlowCanvas";

const FlowBuilderPage = () => {
    return (
        <section>
            <h1 className="text-3xl font-bold text-text">
                Flow Builder
            </h1>

            <p className="mt-2 text-muted">
                Build and connect your telemetry processing flow.
            </p>

            <div className="mt-6">
                <FlowCanvas />
            </div>
        </section>
    );
};

export default FlowBuilderPage;