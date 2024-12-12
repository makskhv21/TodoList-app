import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CSSpage/pages.css';

import iconTodoList from './img/icon-header.png';
import iconManagement from './img/iconManagement.png';
import iconCallendar from './img/iconCallendar.png';
import iconCollaboration from './img/iconCollaboration.png';

import photoCareerDevelopment from './img/photoCareer-development.png';
import photoPrioritization from './img/photoPrioritization.png';
import photoProductivity from './img/photoProductivity.png';
import photoTime from './img/photoTime.png';

import photoUser1 from './img/photoUser1.jpg';
import photoUser2 from './img/photoUser2.jpg';

function HomePage() {
  const [selectedInsight, setSelectedInsight] = useState('productivity-hacks');

  const insightsData = {
    'productivity-hacks': {
      title: 'Productivity Hacks',
      content:
        'Learn proven strategies to increase your daily productivity. From the Pomodoro Technique to task batching, discover new ways to stay focused and get more done in less time.',
      image: photoProductivity,
    },
    'time-management': {
      title: 'Time Management Mastery',
      content:
        'Understand how to effectively manage your time by prioritizing tasks and minimizing distractions. Our expert advice will help you make the most of your hours and achieve more.',
      image: photoTime,
    },
    'workflow-optimization': {
      title: 'Workflow Optimization',
      content:
        'Optimize your daily workflow with tips on task automation and seamless collaboration tools. Learn how to automate repetitive tasks and reduce friction in your work routine.',
      image: photoPrioritization,
    },
    'success-stories': {
      title: 'Success Stories',
      content:
        'Get inspired by stories from people who have transformed their work and life through better task management. Learn from their experiences and apply their tips to your own life.',
      image: photoCareerDevelopment,
    },
  };

  const handleNavClick = (insightKey) => {
    setSelectedInsight(insightKey);
  };

  return (
    <div className="homepage">
      <header className="homepage-header">
        <a style={{ textDecoration: 'none' }}>
          <img
            src={iconTodoList}
            alt="iconTodoList"
            className="homepage-header-img"
          />
          <h1>TodoList</h1>
        </a>
        <ul>
          <li>Home</li>
          <li>Features</li>
          <li>Insights</li>
          <li>Contact</li>
        </ul>
        <div className="btn-log-sign">
          <button className="btn-login">
            <Link to="/login" style={{ textDecoration: 'none' }}>
              Login
            </Link>
          </button>
          <button className="btn-sign">
            <Link to="/signup" style={{ textDecoration: 'none' }}>
              Sign Up
            </Link>
          </button>
        </div>
      </header>

      <main className="homepage-main">
        <section className="homepage-main-welcome">
          <h1>Organize Your life with TodoList</h1>
          <p>
            Stay on top of your tasks with our easy-to-use task manager designed
            to help you prioritize and achieve your goals.
          </p>
          <button className="btn-getStarted">
            <Link
              to="/signup"
              className="btn-getStarted-signUp"
              style={{ textDecoration: 'none' }}
            >
              Get Started
            </Link>
          </button>
        </section>

        <section className="homepage-main-features">
          <h1>Features</h1>
          <div className="homepage-main-features-grid">
            <div className="feature-card">
              <img
                src={iconManagement}
                alt="Task Management"
                className="feature-image"
              />
              <h2>Task Management</h2>
              <p>
                Create and organize tasks effortlessly with our intuitive
                interface.
              </p>
            </div>

            <div className="feature-card">
              <img
                src={iconCallendar}
                alt="Calendar Integration"
                className="feature-image"
              />
              <h2>Calendar Integration</h2>
              <p>
                Sync your tasks with your calendar to never miss a deadline.
              </p>
            </div>

            <div className="feature-card">
              <img
                src={iconCollaboration}
                alt="Collaboration"
                className="feature-image"
              />
              <h2>Collaboration</h2>
              <p>
                Share tasks with your team and work together more efficiently
                and seamlessly.
              </p>
            </div>
          </div>
        </section>

        <section className="homepage-main-insights">
          <h1>Insights</h1>

          <div className="insight-nav">
            <a
              onClick={() => handleNavClick('productivity-hacks')}
              className={
                selectedInsight === 'productivity-hacks' ? 'active' : ''
              }
            >
              Productivity Hacks
            </a>
            <a
              onClick={() => handleNavClick('time-management')}
              className={selectedInsight === 'time-management' ? 'active' : ''}
            >
              Time Management Mastery
            </a>
            <a
              onClick={() => handleNavClick('workflow-optimization')}
              className={
                selectedInsight === 'workflow-optimization' ? 'active' : ''
              }
            >
              Workflow Optimization
            </a>
            <a
              onClick={() => handleNavClick('success-stories')}
              className={selectedInsight === 'success-stories' ? 'active' : ''}
            >
              Success Stories
            </a>
          </div>

          <div className="insight-content">
            <div className="insight-image">
              <img
                src={insightsData[selectedInsight].image}
                alt={insightsData[selectedInsight].title}
              />
            </div>
            <div className="insight-text">
              <h2>{insightsData[selectedInsight].title}</h2>
              <p>{insightsData[selectedInsight].content}</p>
              <Link
                to={`/${selectedInsight}`}
                className="insight-link"
                style={{ textDecoration: 'none' }}
              >
                Read More
              </Link>
            </div>
          </div>
        </section>

        <section className="homepage-main-testimonials">
          <h1>What Our Users Are Saying</h1>
          <div className="testimonials-cards">
            <div className="testimonial-card">
              <div className="testimonial-photo">
                <img src={photoUser1} alt="John Doe" />
              </div>
              <div className="testimonial-content">
                <p className="testimonial-quote">
                  &quot;TodoList has truly changed my workflow. It helps me
                  prioritize tasks and stay organized in a simple and effective
                  way!&quot;
                </p>
                <p className="testimonial-author">John Doe, Freelancer</p>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-photo">
                <img src={photoUser2} alt="Jane Smith" />
              </div>
              <div className="testimonial-content">
                <p className="testimonial-quote">
                  &quot;This tool is a game-changer for my team. Task sharing
                  and collaboration have never been easier!&quot;
                </p>
                <p className="testimonial-author">Jane Smith, Team Leader</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="homepage-footer">
        <div className="footer-content">
          <div className="footer-about">
            <h2>About TodoList</h2>
            <p>
              TodoList is a comprehensive task management platform designed to
              help you organize, prioritize, and achieve your goals with ease.
            </p>
          </div>

          <div className="footer-contact">
            <h2>Contact Us</h2>
            <p>
              Email:{' '}
              <a href="mailto:support@todolist.com">support@todolist.com</a>
            </p>
            <p>Phone: +1 234 567 890</p>
          </div>
        </div>
        <p className="footer-bottom">
          TodoList-app &copy; 2024. All Rights Reserved. <br /> Created by
          <a
            href="https://github.com/your-username/your-repository"
            target="_blank"
            rel="noopener noreferrer"
          >
            Maksim Khvyts
          </a>
        </p>
      </footer>
    </div>
  );
}

export default HomePage;
