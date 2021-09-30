import React from 'react'
import { useState, useEffect } from 'react'
import { Card, Row, Col, Image } from 'react-bootstrap'
import Chart from 'react-google-charts'

const UserScreen = ({ match }) => {
  const [user, setUser] = useState({})
  const [submission, setSubmission] = useState({})
  const [contest, setContest] = useState({})

  const getUser = async () => {
    const url = `https://codeforces.com/api/user.info?handles=${match.params.user}`
    const response = await fetch(url)
    setUser((await response.json()).result[0])
    console.log(user)
  }

  const getSubmission = async () => {
    const url = `https://codeforces.com/api/user.status?handle=${match.params.user}&from=1`
    const response = await fetch(url)
    // console.log((await response.json()).result)
    setSubmission((await response.json()).result)
    // console.log(submission)
  }

  const getContest = async () => {
    const url = `https://codeforces.com/api/user.rating?handle=${match.params.user}`
    const response = await fetch(url)
    // console.log((await response.json()))
    setContest((await response.json()).result)
  }

  useEffect(() => {
    getUser()
    getSubmission()
    getContest()
  }, [])

  let verdict = {}
  Object.entries(submission).map(([key, value]) => {
    if (verdict[value.verdict]) verdict[value.verdict]++
    else verdict[value.verdict] = 1
    // console.log(typeof value.verdict)
  })

  let dataVerdict = []
  dataVerdict.push(['Task', 'Hours per Day'])
  Object.entries(verdict).map(([key, value]) => {
    dataVerdict.push([key, value])
  })

  let programmingLanguage = {}
  Object.entries(submission).map(([key, value]) => {
    if (programmingLanguage[value.programmingLanguage])
      programmingLanguage[value.programmingLanguage]++
    else programmingLanguage[value.programmingLanguage] = 1
  })

  let dataLanguage = []
  dataLanguage.push(['Task', 'Hours per Day'])
  Object.entries(programmingLanguage).map(
    ([key, value]) => {
      dataLanguage.push([key, value])
    }
  )

  let tags = {}
  Object.entries(submission).map(([key, value]) => {
    // console.log(value.problem.tags)
    value.problem.tags.map((tag) => {
      if (tags[tag]) tags[tag]++
      else tags[tag] = 1
    })
  })

  let dataTag = []
  dataTag.push(['Task', 'Hours per Day'])
  Object.entries(tags).map(([key, value]) => {
    dataTag.push([key, value])
  })

  return (
    <>
      <h1 className='text-center my-3 mb-4'>Profile</h1>
      <Card>
        <Row>
          <Col>
            <Image
              src={user.avatar}
              fluid
              rounded
              width='100%'
            />
          </Col>
          <Col className='my-4'>
            <h4>
              <Row>
                Name: {user.firstName} {user.lastName}
              </Row>
            </h4>
            <h4>
              <Row>Rank: {user.rank}</Row>
            </h4>
            <h4>
              <Row>Rating: {user.rating}</Row>
            </h4>
          </Col>
          <Col className='my-4'>
            <h4>
              <Row>Country: {user.country}</Row>
            </h4>
            {/* from statusInfo */}
            <h4>
              <Row>
                Total Submissions: {submission.length}
              </Row>
            </h4>
            <h4>
              <Row>Rating: {user.rating}</Row>
            </h4>
          </Col>
          <Col className='my-4'>
            {/* from contestInfo */}
            <h4>
              <Row>Total Contests: {contest.length}</Row>
            </h4>
            <h4>
              <Row>Best Rank: {user.maxRank}</Row>
            </h4>
            <h4>
              <Row>Best Rating: {user.maxRating}</Row>
            </h4>
          </Col>
        </Row>
      </Card>
      <Row className='my-4'>
        <Col>
          <Chart
            width={'500px'}
            height={'300px'}
            chartType='PieChart'
            loader={<div>Loading Chart</div>}
            data={dataVerdict}
            options={{
              title: `Verdicts of ${user.firstName} ${user.lastName}`,
              // Just add this option
              is3D: true,
            }}
            rootProps={{ 'data-testid': '2' }}
          />
        </Col>
        <Col>
          <Chart
            width={'500px'}
            height={'300px'}
            chartType='PieChart'
            loader={<div>Loading Chart</div>}
            data={dataLanguage}
            options={{
              title: `Languages of ${user.firstName} ${user.lastName}`,
              // Just add this option
              is3D: true,
            }}
            rootProps={{ 'data-testid': '2' }}
          />
        </Col>
      </Row>
      <div
        className='my-4'
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Chart
          width={'800px'}
          height={'500px'}
          chartType='PieChart'
          loader={<div>Loading Chart</div>}
          data={dataTag}
          options={{
            title: `Tags of ${user.firstName} ${user.lastName}`,
          }}
          rootProps={{ 'data-testid': '1' }}
        />
      </div>
    </>
  )
}

export default UserScreen
