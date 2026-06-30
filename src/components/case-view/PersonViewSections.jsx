import { WizardSection } from '../WizardSection';
import icon from '../../Assets/Layer_1.svg';
import icon2 from '../../Assets/Frame.svg';
import icon3 from '../../Assets/regular.svg';
import {
  buildSuspectExternalView,
  buildSuspectOtherView,
  buildSuspectSchoolmateView,
  buildUnknownPersonView,
  buildWitnessExternalView,
  buildWitnessOtherView,
  buildWitnessSchoolmateView,
} from '../../utils/caseDisplay';

export function DetailsFieldGrid({ fields = [], wideFields = [] }) {
  return (
    <div
      className="details_box_wrapper"
      style={{
        marginTop: '20px',
      }}
    >
      {fields.map((field) => (
        <div key={field.title} className="physical_details_box">
          <p>{field.title}</p>
          <small>{field.para}</small>
        </div>
      ))}
      {wideFields.map((field) => (
        <div
          key={field.title}
          className="physical_details_box"
          style={{
            gridColumn: '1/-1',
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
          }}
        >
          <p>{field.title}</p>
          <small>{field.para}</small>
        </div>
      ))}
    </div>
  );
}

export function DetailsSection({ title = 'Details', fields = [], wideFields = [] }) {
  if (!fields.length && !wideFields.length) {
    return (
      <div style={{ marginTop: '25px' }}>
        <h5
          style={{
            fontSize: '20px',
            color: 'rgba(15, 23, 43, 1)',
            fontWeight: '600',
          }}
        >
          {title}
        </h5>
        <div className="table1-no-data-container">
          <p>No details available</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ marginTop: '25px' }}>
      <h5
        style={{
          fontSize: '20px',
          color: 'rgba(15, 23, 43, 1)',
          fontWeight: '600',
        }}
      >
        {title}
      </h5>
      <DetailsFieldGrid fields={fields} wideFields={wideFields} />
    </div>
  );
}

export function PhotosGallery({ urls = [], label = 'Photos' }) {
  if (!urls.length) return null;

  return (
    <>
      <div className="photos_heading">
        <img src="/Icon.svg" alt="" />
        <p>
          {label} ({urls.length})
        </p>
      </div>
      <div className="photos_wrapper">
        {urls.map((url) => (
          <div key={url} className="photos_div">
            <a href={url} target="_blank" rel="noreferrer">
              <img
                src="/download.svg"
                alt="Download"
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                }}
              />
            </a>
            <img className="photo_img" src={url} alt="" />
          </div>
        ))}
      </div>
    </>
  );
}

export function UnknownPersonSections({ physical, vehicle, other }) {
  return (
    <>
      {physical?.fields?.length || physical?.photoUrls?.length ? (
        <div style={{ marginTop: '25px' }}>
          <WizardSection
            iconBg="linear-gradient(135deg, #FDC700 0%, #CF8A41 100%)"
            icon={<img src={icon} alt="" />}
            title="Physical Details"
            subtitle="Appearance and identifying features"
          />
          <div className="physical_details_box_wrapper">
            {physical.fields.map((field) => (
              <div key={field.title} className="physical_details_box">
                <p>{field.title}</p>
                <small>{field.para}</small>
              </div>
            ))}
          </div>
          <PhotosGallery urls={physical.photoUrls} />
        </div>
      ) : null}

      {vehicle?.fields?.length || vehicle?.photoUrls?.length ? (
        <div style={{ marginTop: '25px' }}>
          <WizardSection
            iconBg=" linear-gradient(135deg, #5CEFBC 0%, #1AAF67 100%)"
            icon={<img src={icon2} alt="" />}
            title="Vehicle Details"
            subtitle="Vehicle description"
          />
          <div className="vehicle_details_box_wrapper">
            {vehicle.fields.map((field) => (
              <div key={field.title} className="physical_details_box">
                <p>{field.title}</p>
                <small>{field.para}</small>
              </div>
            ))}
            {vehicle.lastSeenLocation ? (
              <div
                className="physical_details_box"
                style={{
                  gridColumn: '1/-1',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '5px',
                }}
              >
                <p>Last seen location</p>
                <small>{vehicle.lastSeenLocation}</small>
              </div>
            ) : null}
          </div>
          <PhotosGallery urls={vehicle.photoUrls} label="Vehicle photos" />
        </div>
      ) : null}

      {other?.description ? (
        <div style={{ marginTop: '25px' }}>
          <WizardSection
            iconBg="linear-gradient(135deg, #62E2FF 0%, #5D78DA 100%)"
            icon={<img src={icon3} alt="" />}
            title="Other Details"
            subtitle="Additional observations"
          />
          <div
            className="physical_details_box"
            style={{
              gridColumn: '1/-1',
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
            }}
          >
            <p>Describe actions, behavior, or anything unusual observed by witnesses or staff.</p>
            <small>{other.description}</small>
          </div>
        </div>
      ) : null}
    </>
  );
}

function OtherPersonSections({ summary, identifying, identifyingTitle = 'Identifying info' }) {
  return (
    <>
      <DetailsSection
        title="Details"
        fields={summary.fields}
        wideFields={summary.wideFields}
      />
      {(identifying.fields.length > 0 || identifying.wideFields.length > 0) && (
        <div style={{ marginTop: '25px' }}>
          <WizardSection
            iconBg="#F0D9FF"
            icon={<img src="/Container (1).svg" alt="" />}
            title={identifyingTitle}
            subtitle="Identification details"
          />
          <DetailsFieldGrid
            fields={identifying.fields}
            wideFields={identifying.wideFields}
          />
        </div>
      )}
    </>
  );
}

export function SuspectPersonContent({ suspect }) {
  if (!suspect) return null;

  if (!suspect.do_you_know_the_suspect) {
    const unknownView = buildUnknownPersonView(suspect);
    if (!unknownView.physical && !unknownView.vehicle && !unknownView.other) {
      return (
        <DetailsSection
          wideFields={[{ title: 'Details', para: 'No description provided' }]}
        />
      );
    }
    return <UnknownPersonSections {...unknownView} />;
  }

  if (suspect.suspect_relationship_type === 'schoolmate') {
    const view = buildSuspectSchoolmateView(suspect.schoolmate);
    return <DetailsSection fields={view.fields} wideFields={view.wideFields} />;
  }

  if (suspect.suspect_relationship_type === 'external_student') {
    const view = buildSuspectExternalView(suspect.external_student);
    return <DetailsSection fields={view.fields} wideFields={view.wideFields} />;
  }

  if (suspect.suspect_relationship_type === 'other') {
    const view = buildSuspectOtherView(suspect.other);
    return <OtherPersonSections summary={view.summary} identifying={view.identifying} />;
  }

  return <DetailsSection fields={[]} wideFields={[]} />;
}

export function WitnessPersonContent({ witness }) {
  if (!witness) return null;

  if (!witness.do_you_know_the_witness) {
    const unknownView = buildUnknownPersonView(witness);
    if (!unknownView.physical && !unknownView.vehicle && !unknownView.other) {
      return (
        <DetailsSection
          wideFields={[{ title: 'Details', para: 'No description provided' }]}
        />
      );
    }
    return <UnknownPersonSections {...unknownView} />;
  }

  if (witness.witness_relationship_type === 'schoolmate') {
    const view = buildWitnessSchoolmateView(witness.schoolmate);
    return <DetailsSection fields={view.fields} wideFields={view.wideFields} />;
  }

  if (witness.witness_relationship_type === 'external_student') {
    const view = buildWitnessExternalView(witness.external_student);
    return <DetailsSection fields={view.fields} wideFields={view.wideFields} />;
  }

  if (witness.witness_relationship_type === 'other') {
    const view = buildWitnessOtherView(witness.other);
    return <OtherPersonSections summary={view.summary} identifying={view.identifying} />;
  }

  return <DetailsSection fields={[]} wideFields={[]} />;
}
