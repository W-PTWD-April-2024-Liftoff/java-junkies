import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { buildAuthHeader } from '../utils/buildAuthHeader';
import { Container, Row, Col, Image, Button, Card, Form } from 'react-bootstrap';
import ContactForm from './ContactForm';

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

        const text = await response.text();
        if (!response.ok) throw new Error(text);

        const data = JSON.parse(text);
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
      console.warn('No id provided');
      setLoading(false);
    }
  }, [id, getAccessTokenSilently]);

  const handleGoToUpdate = () => {
    navigate(`/update-profile/${id}`);
  };

  if (loading) return <Container className='mt-5'><p>Loading profile...</p></Container>;
  if (!user) return <Container className='mt-5'><p>User not found</p></Container>;

  return (
    <Container>
      <Row className='justify-content-center'>
        <Col>
          <Card className='mb-4 shadow-sm'>
            <Card.Body className='text-center'>
              <Image
                src={
                  user.profilePictureUpload
                    ? `http://localhost:5176/uploads/images/${user.profilePictureUpload}`
                    : '/default-avatar.png'
                }
                roundedCircle
                fluid
                alt="Profile Photo"
              />
              <h2 className='mb-1'>{user.name || 'N/A'}</h2>
              <p className='text-muted'>username: {user.username || 'N/A'}</p>
              <p className='text-muted'>email: {user.email || 'N/A'}</p>
              <p className='text-secondary'> {user.bio || 'No bio added yet.'}</p>
              <Button
                variant='primary'
                onClick={handleGoToUpdate}>
                Update Profile
              </Button>
            </Card.Body>
          </Card>

          <Card className='shadow-sm p-3'>
            <Card.Body>
              <h5 className='mb-2'>Contact {user.name}</h5>
              <ContactForm userEmail={user.email} />
            </Card.Body>
          </Card>


        </Col>

      </Row >
    </Container >
  );
};

export default ProfilePage;

// const styles = {
//   container: {
//     padding: '2rem',
//     maxWidth: '600px',
//     margin: 'auto',
//     textAlign: 'center',
//     backgroundColor: '#f7f7f7',
//     borderRadius: '12px',
//     boxShadow: '0 0 10px rgba(0,0,0,0.1)'
//   },
//   title: {
//     fontSize: '2rem',
//     marginBottom: '1rem'
//   },
//   image: {
//     width: '120px',
//     height: '120px',
//     borderRadius: '50%',
//     objectFit: 'cover',
//     marginBottom: '1rem'
//   },
//   info: {
//     textAlign: 'left',
//     marginTop: '1rem',
//     lineHeight: '1.6',
//     fontSize: '1rem'
//   },
//   button: {
//     marginTop: '1.5rem',
//     padding: '10px 20px',
//     backgroundColor: '#4e9af1',
//     color: 'white',
//     border: 'none',
//     borderRadius: '6px',
//     cursor: 'pointer'
//   }
// };

