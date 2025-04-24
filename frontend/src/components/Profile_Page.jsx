import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { buildAuthHeader } from '../utils/buildAuthHeader';
import { Container, Row, Col, Image, Button, Card } from 'react-bootstrap';
import ContactForm from './ContactForm';
import PhotoUploader from './PhotoUploader';

const ProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const headers = await buildAuthHeader({ getAccessTokenSilently });
        const response = await fetch(`http://localhost:5176/api/user/profile/${id}`, {
          method: 'GET',
          credentials: 'include',
          headers,
        });

        if (!response.ok) throw new Error("Failed to fetch profile");

        const data = await response.json();
        setUser(data);
      } catch (err) {
        console.error("Error fetching user:", err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [id, getAccessTokenSilently]);

  const handleGoToUpdate = () => {
    navigate(`/update-profile/${id}`);
  };

  if (loading) return <Container className='mt-5'><p>Loading profile...</p></Container>;
  if (!user) return <Container className='mt-5'><p>User not found</p></Container>;

  const imageSrc = user.profilePictureData
    ? `data:image/jpeg;base64,${user.profilePictureData}`
    : '/default-avatar.png';

  return (
    <Container className='mt-5'>
      <Row className='justify-content-center'>
        <Col md={8}>
          <Card className='mb-4 shadow-sm'>
            <Card.Body className='text-center'>
             <Image
               src={
                 user.profilePictureBase64
                   ? user.profilePictureBase64
                   : '/default-avatar.png'
               }
                roundedCircle
                style={{ width: '150px', height: '150px', objectFit: 'cover', marginBottom: '15px' }}
                alt="Profile Photo"
             />

              <h2 className='mt-3'>{user.name || 'N/A'}</h2>
              <p className='text-muted'>username: {user.username || 'N/A'}</p>
              <p className='text-muted'>email: {user.email || 'N/A'}</p>
              <p className='text-secondary'>{user.bio || 'No bio added yet.'}</p>
              <Button variant='primary' onClick={handleGoToUpdate}>
                Update Profile
              </Button>
              <hr />
              <PhotoUploader userId={id} onSuccess={() => window.location.reload()} />
            </Card.Body>
          </Card>

          <Card className='shadow-sm'>
            <Card.Body>
              <h5>Contact {user.name}</h5>
              <ContactForm userEmail={user.email} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
