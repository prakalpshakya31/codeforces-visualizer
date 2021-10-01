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

  let ratings = {}
  Object.entries(submission).map(([key, value]) => {
    if (
      ratings[value.problem.rating] &&
      value.problem.rating &&
      value.verdict == 'OK'
    )
      ratings[value.problem.rating]++
    else if (value.problem.rating && value.verdict == 'OK')
      ratings[value.problem.rating] = 1
  })

  let dataRating = []
  dataRating.push(['', 'Solved'])
  Object.entries(ratings).map(([key, value]) => {
    dataRating.push([key, value])
  })

  let indexes = {}
  Object.entries(submission).map(([key, value]) => {
    if (
      indexes[value.problem.index] &&
      value.problem.index &&
      value.verdict == 'OK'
    )
      indexes[value.problem.index]++
    else if (value.problem.index && value.verdict == 'OK')
      indexes[value.problem.index] = 1
  })

  let dataIndex = []
  dataIndex.push(['', 'Solved'])
  Object.entries(indexes).map(([key, value]) => {
    dataIndex.push([key, value])
  })
  dataIndex.sort()

  let dataContestRating = []
  dataContestRating.push(['x', 'Contest Rating'])
  let counter = 1
  Object.entries(contest).map(([key, value]) => {
    dataContestRating.push([counter, value.newRating])
    counter++
  })

  let totalTried = 0,
    totalSolved = 0,
    averageAttempts = 0
  let totalProblems = {}
  Object.entries(submission).map(([key, value]) => {
    if (totalProblems[value.problem.name])
      totalProblems[value.problem.name]++
    else {
      totalProblems[value.problem.name] = 1
      totalTried++
      if (value.verdict == 'OK') totalSolved++
    }
  })
  averageAttempts = (
    submission.length / totalSolved
  ).toFixed(2)

  let solvedWithOneSubmission = 0,
    maxAttempts = 0
  Object.entries(totalProblems).map(([key, value]) => {
    if (value == 1) solvedWithOneSubmission++
    if (value > maxAttempts) maxAttempts = value
  })

  let bestRank = 100000,
    worstRank = 0,
    maxUp = -1000,
    maxDown = 1000

  Object.entries(contest).map(([key, value]) => {
    if (value.rank < bestRank) bestRank = value.rank
    if (value.rank > worstRank) worstRank = value.rank
    if (value.newRating - value.oldRating > maxUp)
      maxUp = value.newRating - value.oldRating
    if (value.newRating - value.oldRating < maxDown)
      maxDown = value.newRating - value.oldRating
  })

  return (
    <>
      <h1 className='text-center my-3 mb-4'>Profile</h1>
      <Row>
        <Col>
          <Row>
            <Col>Some numbers about</Col>
            <Col>{user.handle}</Col>
          </Row>
          <Row>
            <Col>Tried</Col>
            <Col>{totalTried}</Col>
          </Row>
          <Row>
            <Col>Solved</Col>
            <Col>{totalSolved}</Col>
          </Row>
          <Row>
            <Col>Average attempts</Col>
            <Col>{averageAttempts}</Col>
          </Row>
          <Row>
            <Col>Max attempts</Col>
            <Col>{maxAttempts}</Col>
          </Row>
          <Row>
            <Col>Solved with one submission</Col>
            <Col>{solvedWithOneSubmission}</Col>
          </Row>
        </Col>

        <Col>
          <Row>
            <Col>Contests of</Col>
            <Col>{user.handle}</Col>
          </Row>
          <Row>
            <Col>Number of contests</Col>
            <Col>{contest.length}</Col>
          </Row>
          <Row>
            <Col>Best rank</Col>
            <Col>{bestRank}</Col>
          </Row>
          <Row>
            <Col>Worst rank</Col>
            <Col>{worstRank}</Col>
          </Row>
          <Row>
            <Col>Max up</Col>
            <Col>{maxUp}</Col>
          </Row>
          <Row>
            <Col>Max down</Col>
            <Col>{maxDown}</Col>
          </Row>
        </Col>
      </Row>
      <Row
        className='my-4'
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Chart
          width={'700px'}
          height={'400px'}
          chartType='LineChart'
          loader={<div>Loading Chart</div>}
          data={dataContestRating}
          options={{
            title: 'Contest Ratings',
          }}
          rootProps={{ 'data-testid': '1' }}
        />
      </Row>
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
          width={'700px'}
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
      <Row
        className='my-4'
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Chart
          width={'1000px'}
          height={'300px'}
          chartType='Bar'
          loader={<div>Loading Chart</div>}
          data={dataRating}
          options={{
            // Material design options
            chart: {
              title: `Problem Ratings of ${user.firstName} ${user.lastName}`,
            },
          }}
          // For tests
          rootProps={{ 'data-testid': '2' }}
        />
      </Row>
      <Row
        className='my-4'
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Chart
          width={'1000px'}
          height={'300px'}
          chartType='Bar'
          loader={<div>Loading Chart</div>}
          data={dataIndex}
          options={{
            // Material design options
            chart: {
              title: `Problem Indexes of ${user.firstName} ${user.lastName}`,
            },
          }}
          // For tests
          rootProps={{ 'data-testid': '2' }}
        />
      </Row>
    </>
  )
}

export default UserScreen
