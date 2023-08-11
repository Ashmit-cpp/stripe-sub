const StripePricingTable = () => {
    const [isPlanSelected, setIsPlanSelected] = useState(false);
    
    useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.stripe.com/v3/pricing-table.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
    document.body.removeChild(script);
    };
    }, []);
    
    const handleSelectPlan = (planId) => {
    setIsPlanSelected(true);
    };
    
    const handleWebhook = (event) => {
    if (event.data.type === "checkout.session.completed") {
    // Update the MongoDB database with the user's selected plan ID.
    // Switch to a different dashboard page.
    }
    };
    
    return (
    <div >
    <h1 class="text-2xl font-bold text-center pb-9 pt-14">Choose the right plan for you</h1>
    {!isPlanSelected && (
    <stripe-pricing-table
    pricing-table-id="prctbl_1Ndai8SCSiTFNLWTkpox0wE8"
    publishable-key="pk_test_51NdZGrSCSiTFNLWTvkV8gHmGVMCwnabecK6YPKwx26CBPJUmeRx81Nm1LGuGP0OLTdMHOAPeA1gcNViRMyhEpRI500Doa7lu6C"
    onSelectPlan={handleSelectPlan}
    />
    )}
    {isPlanSelected && <Webhook />}
    </div>
    );
    };