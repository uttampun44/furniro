import FeatureImg from "../assets/images/Feature.png"

const CompanyFeature : React.FC = () =>{
    return(
        <>
            <div className="comapnyFeature py-24 px-12 flex justify-center bg-primary">
                   <img src={FeatureImg} />
            </div>
        </>
    )
}
export default CompanyFeature